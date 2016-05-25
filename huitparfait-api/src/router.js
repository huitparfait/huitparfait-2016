import shortid from 'shortid'
import cypher from './infra/neo4j'

exports.register = function (server, options, next) {

    server.route([

        // TODO remove
        {
            method: 'GET',
            path: '/',
            handler(req, reply) {
                reply({ ok: 42 })
            },
        },

        {
            method: 'POST',
            path: '/api/users/me',
            config: {
                auth: 'jwt-anonymous',
                handler(req, reply) {

                    const id = shortid()

                    cypher(`
                        MERGE         (u:User { email: {email} })
                        ON CREATE SET u.createdAt        = timestamp(),
                                      u.updatedAt        = timestamp(),
                                      u.id               = {id},
                                      u.name             = {name},
                                      u.email            = {email},
                                      u.avatarUrl        = {avatarUrl},
                                      u.lastConnectionAt = timestamp(),
                                      u.isAnonymous      = false
                        ON MATCH SET  u.lastConnectionAt = timestamp()
                        RETURN        u.id                             AS id,
                                      u.isAnonymous                    AS isAnonymous
                        `,
                        {
                            id,
                            email: req.payload.email,
                            name: req.payload.name,
                            avatarUrl: req.payload.avatarUrl,
                        })
                        .then(([user]) => reply(user))
                        .catch(err => reply(err))
                },
            },
        },

        {
            method: 'GET',
            path: '/api/users/me',
            handler(req, reply) {

                cypher(`
                    MATCH (u:User { id: {id} })
                    RETURN u.id          AS id,
                           u.name        AS name,
                           u.avatarUrl   AS avatarUrl,
                           u.isAnonymous AS isAnonymous
                    `,
                    {
                        id: req.auth.credentials.id,
                    })
                    .then(([user]) => reply(user))
            },
        },
    ])

    next()
}


exports.register.attributes = {
    name: 'router',
}
