import _ from 'lodash'
import { cypher } from '../infra/neo4j'
import { betterUser } from './userService'


let rankingAllCache
rankingAllCache = calculateRanking({ pageSize: null })

export function calculateRanking({ groupId, userId, from = 0, pageSize = 50 }) {
    if (groupId == null && rankingAllCache) {
        return rankingAllCache.then(paginate)
    }

    console.log('Calculate Ranking...')

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
        WITH
          u, pperf,
          p.classicPoints + p.riskPoints AS score
        RETURN
                u.id            AS userId,
                u.name          AS userName,
                u.anonymousName AS anonymousName,
                u.avatarUrl     AS avatarUrl,
                u.isAnonymous   AS isAnonymous,
                SUM(score) as totalScore,
                COUNT(score) as nbPredictions,
                COUNT(pperf) as nbPerfects
        ORDER BY totalScore DESC, nbPredictions DESC, nbPerfects DESC`,
        {
            userId,
            groupId,
        })
        .map(formatRanking)
        .then(calculateRank)
        .then(paginate)
        .tap((results = []) => {
            console.log('Calculate Ranking:', results.length)
        })

    function paginate(results = []) {
        if (pageSize == null) {
            return results
        }

        return results.slice(from, pageSize + from)
    }
}

export function formatRanking(rank) {
    const user = betterUser({
        id: rank.userId,
        name: rank.userName,
        ..._.pick(rank, 'avatarUrl', 'anonymousName', 'isAnonymous'),
    })

    return {
        user: _.omit(user, 'id', 'isAnonymous', 'anonymousName'),
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
