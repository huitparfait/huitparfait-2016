import { cypher } from '../infra/neo4j'
import _ from 'lodash'
import { betterUser, fetchUsersWithIds } from './userService'
import moment from 'moment'

let commonRankingCache

fetchCommonRankingByCache({})

export function fetchCommonRankingByCache({ forceUpdate = false }) {
    if (commonRankingCache && !forceUpdate) {
        return commonRankingCache
    }
    commonRankingCache = calculateCommonRanking()
    return commonRankingCache
}

export function calculateCommonRanking() {
    return cypher(`
        MATCH (u:User)
        OPTIONAL MATCH (u)<-[:CREATED_BY_USER]-(p:Pronostic)-[IS_ABOUT_GAME]->(game:Game)
        WHERE game.startsAt < timestamp()
        OPTIONAL MATCH (u)<-[:CREATED_BY_USER]-(pp:Pronostic)-[IS_ABOUT_GAME]->(game)
        WHERE   p.classicPoints IS NOT NULL
                AND pp.classicPoints = 5
                AND pp.riskPoints = 3
        WITH
          u,
          p.classicPoints + p.riskPoints AS score,
          pp AS perfect
        RETURN
                u.id           AS userId,
                SUM(score)     AS totalScore,
                COUNT(score)   AS nbPredictions,
                COUNT(perfect) AS nbPerfects
                ORDER BY totalScore DESC, nbPredictions DESC, nbPerfects DESC`)
}

export function fetchCommonRankingWithPaginate({ page = 1, pageSize = 50 }) {

    return fetchCommonRankingByCache({})
        .then(calculateRank)
        .then(paginate)
        .then(attachUser)
        .map(formatRanking({ transformAnonymous: true }))


    function attachUser(ranking) {
        const userIds = _.map(ranking, 'userId')

        return fetchUsersWithIds(userIds).then((users) => {
            const usersById = _.keyBy(users, 'userId')

            return ranking.map((row) => {
                return {
                    ...row,
                    ...usersById[row.userId],
                }
            })
        })
    }


    function paginate(results = []) {
        if (page === 0) {
            page = 1
        }

        const from = pageSize * (page - 1)
        return results.slice(from, pageSize + from)
    }
}

export function calculateRanking({ groupId, userId, page = 1, pageSize = 50 }) {

    const eightLimit = getEightLimit()

    return cypher(`
        MATCH (me:User { id: {userId} })-[:IS_MEMBER_OF_GROUP { isActive: true }]->(g:Group {id: {groupId}} )
        MATCH (u:User)-[:IS_MEMBER_OF_GROUP { isActive: true }]->(g)
        OPTIONAL MATCH (u)<-[:CREATED_BY_USER]-(p:Pronostic)-[IS_ABOUT_GAME]->(game:Game)
        WHERE game.startsAt < {eightLimit}
        OPTIONAL MATCH (u)<-[:CREATED_BY_USER]-(pp:Pronostic)-[IS_ABOUT_GAME]->(game)
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
        .then(calculateRank)
        .then(paginate)
        .map(formatRanking({ transformAnonymous: false }))

    function paginate(results = []) {
        if (page === 0) {
            page = 1
        }

        const from = pageSize * (page - 1)
        return results.slice(from, pageSize + from)
    }

    function getEightLimit() {
        const now = moment()
        // TODO handle 8:08 on Europe/Paris timezone properly ;-)
        const eightLimit = moment().startOf('day').add({ hours: 6, minutes: 8 })

        if (now.isBefore(eightLimit)) {
            return eightLimit.subtract(1, 'days').valueOf()
        }

        return eightLimit.valueOf()
    }
}

function formatRanking({ transformAnonymous }) {

    return function formatRanking(rank) {
        return {
            rank: rank.rank,
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

        if (idx > 0 && rows[idx - 1].totalScore === row.totalScore) {
            row.rank = rows[idx - 1].rank
            return
        }

        row.rank = idx + 1
    })

    return ranking
}
