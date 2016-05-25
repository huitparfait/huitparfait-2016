import Joi from 'joi'
import shortid from 'shortid'
import { cypher, cypherOne } from '../infra/neo4j'

exports.register = function (server, options, next) {

    server.route([

        {
            method: 'POST',
            path: '/api/users/me',
            config: {
                auth: 'jwt-anonymous',
                validate: {
                    payload: Joi.object({
                        email: Joi.string().email().required(),
                        name: Joi.string(),
                        avatarUrl: Joi.string(),
                    }).required(),
                },
                handler(req, reply) {
                    cypherOne(`
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
                        RETURN        u.id          AS id,
                                      u.isAnonymous AS isAnonymous`,
                        {
                            id: shortid(),
                            email: req.payload.email,
                            name: req.payload.name,
                            avatarUrl: req.payload.avatarUrl || null,
                        })
                        .then(reply)
                        .catch(reply)
                },
            },
        },

        {
            method: 'GET',
            path: '/api/users/me',
            handler(req, reply) {
                cypherOne(`
                    MATCH (u:User { id: {id} })
                    RETURN u.id          AS id,
                           u.name        AS name,
                           u.avatarUrl   AS avatarUrl,
                           u.isAnonymous AS isAnonymous`,
                    {
                        id: req.auth.credentials.id,
                    })
                    .then(reply)
                    .catch(reply)
            },
        },

        {
            method: 'GET',
            path: '/api/users/me/groups',
            config: {
                handler(req, reply) {
                    cypher(`
                        MATCH    (:User { id:{id} })-[imog:IS_MEMBER_OF_GROUP]->(g:Group)
                        MATCH    (u:User)-->g
                        WHERE    imog.isActive = true
                        RETURN   g.name      AS name, 
                                 g.avatar    AS avatar, 
                                 g.id        AS id, 
                                 count(u.id) AS userCount
                        ORDER BY g.name`,
                        {
                            id: req.auth.credentials.id,
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
    name: 'users-route',
}
