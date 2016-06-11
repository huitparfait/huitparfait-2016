import { cypher } from '../infra/neo4j'
import { betterUser } from './userService'
import moment from 'moment'

export function calculateRanking({ groupId, userId, from = 0, pageSize = 50 }) {

    const transformAnonymous = (groupId == null)

    // TODO ça marche pas
    const eightLimit = moment()
    // .subtract(8, 'hours')
    // .subtract(8, 'minutes')
    // .startOf('day')
        .valueOf()

    return cypher(`
        MATCH (me:User { id: {userId} })-[:IS_MEMBER_OF_GROUP { isActive: true }]->(g:Group {id: {groupId}} )
        MATCH (u:User)-[:IS_MEMBER_OF_GROUP { isActive: true }]->(g)
        OPTIONAL MATCH   (u)<-[:CREATED_BY_USER]-(p:Pronostic)-[IS_ABOUT_GAME]->(game:Game)
        OPTIONAL MATCH   (u)<-[:CREATED_BY_USER]-(pp:Pronostic)-[IS_ABOUT_GAME]->(game)
        WHERE   p.classicPoints IS NOT NULL
                AND pp.classicPoints IS NOT NULL
                AND game.startsAt < {eightLimit}
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
}

function formatRanking({ transformAnonymous }) {

    return function formatRanking(rank) {

        console.log(rank);

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

function calculateRank(ranking = []) {

    ranking.forEach((row, idx, rows) => {

        if (idx > 0 && rows[idx - 1].stats.totalScore === row.stats.totalScore) {
            row.rank = rows[idx - 1].rank
            return
        }

        row.rank = idx + 1
    })

    return ranking
}
