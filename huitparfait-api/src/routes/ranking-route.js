import { cypher } from '../infra/neo4j'
import betterGroup, { shortIdSchema } from '../utils/groupUtils'

exports.register = function (server, options, next) {

    server.route([
        {
            method: 'GET',
            path: '/api/ranking',
            config: {
                description: 'Fetch ranking',
                tags: ['api'],
                handler(req, reply) {
                    cypher(`
                        MATCH    (:User { id:{userId} })-[:IS_MEMBER_OF_GROUP { isActive: true }]->(g:Group)
                        MATCH    (u:User)-[:IS_MEMBER_OF_GROUP]->(g)
                        RETURN   g.name      AS name, 
                                 g.avatarUrl AS avatarUrl, 
                                 g.id        AS id,
                                 count(DISTINCT u.id) AS userCount
                        ORDER BY lower(g.name)`,
                        {
                            userId: req.auth.credentials.id,
                        })
                        .map(betterGroup)
                        .then(reply)
                        .catch(reply)
                },
            },
        },
        {
            method: 'GET',
            path: '/api/groups/{groupId}/ranking',
            config: {
                description: 'Read group\'s users',
                tags: ['api'],
                validate: {
                    params: {
                        groupId: shortIdSchema,
                    },
                },
                handler(req, reply) {
                    cypher(`
                        MATCH (:User { id: {userId} })-[:IS_MEMBER_OF_GROUP]->(g:Group { id: {groupId} })
                        MATCH    (u:User)-[m:IS_MEMBER_OF_GROUP {isActive: true}]->(g)
                        RETURN   u.id        AS id, 
                                 u.name      AS name, 
                                 u.avatarUrl AS avatarUrl, 
                                 m.isActive  AS isActive,
                                 m.createdAt AS memberSince
                        ORDER BY memberSince DESC`,
                        {
                            userId: req.auth.credentials.id,
                            groupId: req.params.groupId,
                        })
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
