import _ from 'lodash'
import { cypher } from '../infra/neo4j'
import { betterUser } from './userService'


export function calculateRanking({ groupId, userId }) {
    let matchUserQuery = 'MATCH (u:User)'

    if (groupId) {
        matchUserQuery = `
        MATCH (:User { id: {userId} })-[IS_MEMBER_OF_GROUP { isActive: true }]->(g:Group {id: {groupId}} )
        MATCH (u:User)-[IS_MEMBER_OF_GROUP { isActive: true }]->(g)`
    }

    return cypher(`
        ${matchUserQuery}
        MATCH   (u)<-[:CREATED_BY_USER]-(p:Pronostic)
        MATCH   (p)-[IS_ABOUT_GAME]->(game:Game)
        OPTIONAL MATCH   (u)<-[:CREATED_BY_USER]-(pperf:Pronostic)
        WHERE   p.classicPoints IS NOT NULL
                AND game.startsAt < timestamp()
                AND pperf.classicPoints = 5
                AND pperf.riskPoints = 3
        RETURN
                u.id            AS userId,
                u.name          AS userName,
                u.anonymousName AS anonymousName,
                u.avatarUrl     AS avatarUrl,
                u.isAnonymous   AS isAnonymous,
                p.id AS pronosticId,
                p.createdAt, 
                SUM(p.classicPoints + p.riskPoints) as totalScore,
                COUNT(DISTINCT p.id) as nbPredictions,
                COUNT(DISTINCT pperf.id) as nbPerfects
        ORDER BY totalScore DESC, nbPredictions DESC, nbPerfects DESC, p.createdAt`,
        {
            userId,
            groupId,
        })
        .map(formatRanking)
        .then(calculateRank)
}

export function formatRanking(rank) {
    return {
        user: betterUser({
            id: rank.userId,
            name: rank.userName,
            ..._.pick(rank, 'anonymousName', 'avatarUrl', 'isAnonymous'),
        }),
        stats: {
            totalScore: rank.totalScore,
            nbPredictions: rank.nbPredictions,
            nbPerfects: rank.nbPerfects,
        },
    }
}

export function calculateRank(ranking = []) {
    return _(ranking)
        .orderBy((row) => row.stats.totalScore, 'desc')
        .transform((result, row) => {
            row.rank = getRank(result, row.stats)
            result.push(row)
        }, [])
        .orderBy([
            (rank) => rank.stats.totalScore,
            (rank) => rank.stats.nbPredictions,
            (rank) => rank.stats.nbPerfects,
        ], ['desc', 'desc', 'desc'])
        .value()

    function getRank(rows, stats) {
        if (rows.length === 0) {
            return 1
        }

        const lastRank = _.last(rows, stats)
        if (lastRank.stats.totalScore === stats.totalScore) {
            return lastRank.rank
        }

        return lastRank.rank + 1
    }
}
