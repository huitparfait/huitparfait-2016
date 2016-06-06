import { cypher } from '../infra/neo4j'
import { shortIdSchema } from '../services/groupService'
import { calculateRank, formatRanking } from '../services/rankingService'
import { calculatePronostic } from '../services/pronosticService'

exports.register = function (server, options, next) {

    server.route([
        {
            method: 'GET',
            path: '/api/ranking/{groupId?}',
            config: {
                description: 'Fetch ranking',
                tags: ['api'],
                handler(req, reply) {
                    let matchUserQuery = 'MATCH (u:User)'

                    if (req.params.groupId) {
                        matchUserQuery = `
                        MATCH (:User { id: {userId} })-[IS_MEMBER_OF_GROUP { isActive: true }]->(g:Group {id: {groupId}} )
                        MATCH (u:User)-[IS_MEMBER_OF_GROUP { isActive: true }]->(g)`
                    }

                    cypher(`
                        ${matchUserQuery}
                        MATCH   (u)<-[:CREATED_BY_USER]-(p:Pronostic)
                        OPTIONAL MATCH   (u)<-[:CREATED_BY_USER]-(pperf:Pronostic)
                        WHERE   p.classicPoints IS NOT NULL
                                AND pperf.classicPoints = 8
                        WITH    u,
                                SUM(p.classicPoints + p.riskPoints) as totalScore,
                                COUNT(DISTINCT p.createdAt) as nbPredictions,
                                COUNT(DISTINCT pperf.createdAt) as nbPerfects
                        RETURN
                                u.id            AS userId,
                                u.name          AS userName,
                                u.anonymousName AS anonymousName,
                                u.avatarUrl     AS avatarUrl,
                                u.isAnonymous   AS isAnonymous,
                                totalScore,
                                nbPredictions,
                                nbPerfects
                        ORDER BY totalScore DESC, nbPredictions DESC, nbPerfects DESC`,
                        {
                            userId: req.auth.credentials.id,
                            groupId: req.params.groupId,
                        })
                        .map(formatRanking)
                        .then(calculateRank)
                        .then(reply)
                        .catch(reply)


                },
            },
        },
        {
            method: 'GET',
            path: '/api/ranking/calculate',
            config: {
                handler(req, reply) {
                    calculatePronostic()
                        .then(reply)
                        .catch(reply)
                },
            },
        },
    ])

    next()
}

exports.register.attributes = {
    name: 'ranking-route',
}
