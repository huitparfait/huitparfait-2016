import { cypher } from '../infra/neo4j'
import { betterUser } from './userService'
import moment from 'moment'

export function calculateRanking({ groupId, userId, from = 0, pageSize = 50 }) {

    const transformAnonymous = (groupId == null)
    const eightLimit = getEightLimit()

    return cypher(`
        MATCH (me:User { id: {userId} })-[:IS_MEMBER_OF_GROUP { isActive: true }]->(g:Group {id: {groupId}} )
        MATCH (u:User)-[:IS_MEMBER_OF_GROUP { isActive: true }]->(g)
        MATCH (u)<-[:CREATED_BY_USER]-(p:Pronostic)-[IS_ABOUT_GAME]->(game:Game)
        WHERE game.startsAt < {eightLimit}
        OPTIONAL MATCH   (u)<-[:CREATED_BY_USER]-(pp:Pronostic)-[IS_ABOUT_GAME]->(game)
        WHERE   p.classicPoints IS NOT NULL
                AND pp.classicPoints = 5
                AND pp.riskPoints = 3
        WITH
          u,
          p.classicPoints + p.riskPoints AS score,
          pp AS perfect
        RETURN
                u.id            AS userId,
                u.name          AS userName,
                u.anonymousName AS anonymousName,
                u.avatarUrl     AS avatarUrl,
                u.isAnonymous   AS isAnonymous,
                SUM(score) as totalScore,
                COUNT(score) as nbPredictions,
                COUNT(perfect) AS nbPerfects
                ORDER BY totalScore DESC, nbPredictions DESC, nbPerfects DESC`,
        {
            userId,
            groupId,
            eightLimit,
        })
        .map(formatRanking({ transformAnonymous }))
        .then(calculateRank)
        .then(paginate)

    function paginate(results = []) {
        if (pageSize == null) {
            return results
        }

        return results.slice(from, pageSize + from)
    }

    function getEightLimit() {
        const now = moment()
        const eightLimit = moment().startOf('day').add({ hours: 8, minutes: 8 })

        if (now.isBefore(eightLimit)) {
            return eightLimit.subtract(1, 'days').valueOf()
        }

        return eightLimit.valueOf()
    }
}

function formatRanking({ transformAnonymous }) {

    return function formatRanking(rank) {
        return {
            user: betterUser(rank, transformAnonymous),
            stats: {
                totalScore: rank.totalScore,
                nbPredictions: rank.nbPredictions,
                nbPerfects: rank.nbPerfects,
            },
        }
    }
}

export function calculateRank(ranking = []) {

    ranking.forEach((row, idx, rows) => {

        if (idx > 0 && rows[idx - 1].stats.totalScore === row.stats.totalScore) {
            row.rank = rows[idx - 1].rank
            return
        }

        row.rank = idx + 1
    })

    return ranking
}
