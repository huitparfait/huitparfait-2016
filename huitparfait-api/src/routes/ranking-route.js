import { cypher } from '../infra/neo4j'
import betterGroup from '../utils/groupUtils'

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
                        MATCH    (u:User)-->(g)
                        RETURN   g.name      AS name, 
                                 g.avatarUrl AS avatarUrl, 
                                 g.id        AS id,
                                 count(u.id) AS userCount
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
    ])
    next()
}

exports.register.attributes = {
    name: 'ranking-route',
}
