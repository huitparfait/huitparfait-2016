import Joi from 'joi'
import shortid from 'shortid'
import { notFound } from 'boom'
import { cypherOne } from '../infra/neo4j'

const shortIdSchema = Joi.string().required().regex(/^[a-zA-Z0-9-_]{7,14}$/)

exports.register = function (server, options, next) {

    server.route([
        {
            method: 'POST',
            path: '/api/groups',
            config: {
                description: 'Create group',
                notes: 'Create group and link the user to it as active and admin',
                tags: ['api'],
                validate: {
                    payload: Joi.object({
                        name: Joi.string().required(),
                        avatarUrl: Joi.string(),
                    }).required(),
                },
                handler(req, reply) {
                    cypherOne(`
                        MATCH (u:User {id: {userId} })
                        CREATE 
                        (g:Group { 
                            createdAt:  timestamp(), 
                            updatedAt:  timestamp(), 
                            id:         {groupId}, 
                            name:       {groupName}, 
                            avatarUrl:  {groupAvatarUrl}
                        }),
                        (u)-[:IS_MEMBER_OF_GROUP {
                            createdAt:  timestamp(),
                            updatedAt:  timestamp(), 
                            isAdmin:    true, 
                            isActive:   true
                        }]->(g)
                        RETURN  g.id AS id`,
                        {
                            userId: req.auth.credentials.id,
                            groupId: shortid(),
                            groupName: req.payload.name,
                            groupAvatarUrl: req.payload.avatarUrl || '',
                        })
                        .then(sendCreated(reply, '/api/groups/'))
                        .catch(reply)
                },
            },
        },
        {
            method: 'GET',
            path: '/api/groups/{groupId}',
            config: {
                description: 'Read group',
                tags: ['api'],
                validate: {
                    params: {
                        groupId: shortIdSchema,
                    },
                },
                handler(req, reply) {
                    cypherOne(`
                        MATCH  (:User { id: {userId} })-->(g:Group { id: {groupId} })
                        MATCH  (u:User)-->(g)
                        RETURN g.id        AS id, 
                               g.name      AS name, 
                               g.avatarUrl AS avatarUrl, 
                               count(u.id) AS userCount`,
                        {
                            userId: req.auth.credentials.id,
                            groupId: req.params.groupId,
                        })
                        .then(reply)
                        .catch(reply)
                },
            },
        },
        {
            method: 'PUT',
            path: '/api/groups/{groupId}',
            config: {
                description: 'Update group',
                tags: ['api'],
                validate: {
                    params: {
                        groupId: shortIdSchema,
                        avatarUrl: Joi.string(),
                    },
                },
                handler(req, reply) {
                    cypherOne(`
                        MATCH  (:User { id: {userId} })-[:IS_MEMBER_OF_GROUP { isAdmin: true }]->(g:Group { id: {groupId} })
                        SET    g.updatedAt = timestamp(),
                               g.name      = {groupName},
                               g.avatar    = {groupAvatarUrl}
                        RETURN g.id     AS id`,
                        {
                            userId: req.auth.credentials.id,
                            groupId: req.params.groupId,
                            groupName: req.payload.name,
                            groupAvatarUrl: req.payload.avatarUrl || null,
                        })

                        .then(sendEmpty(reply))
                        .catch(reply)
                },
            },
        },
        {
            method: 'DELETE',
            path: '/api/groups/{groupId}',
            config: {
                description: 'Delete group',
                tags: ['api'],
                validate: {
                    params: {
                        groupId: shortIdSchema,
                    },
                },
                handler(req, reply) {
                    cypherOne(`
                        MATCH  (:User { id: {userId} })-[:IS_MEMBER_OF_GROUP { isAdmin: true }]->(g:Group { id: {groupId} })
                        MATCH  (u:User)-[m:IS_MEMBER_OF_GROUP]->(g)
                        DELETE g, m
                        RETURN count(g) AS deleteCount`,
                        {
                            userId: req.auth.credentials.id,
                            groupId: req.params.groupId,
                        })
                        .then(sendEmptyIfPositiveDeleteCount(reply))
                        .catch(reply)
                },
            },
        },
    ])

    next()
}


exports.register.attributes = {
    name: 'groupes-route',
}


function sendCreated(reply, locationPrefix) {
    return (result) => {
        reply().created(`${locationPrefix}${result.id}`)
    }
}

function sendEmpty(reply) {
    return () => {
        reply().code(204)
    }
}

function sendEmptyIfPositiveDeleteCount(reply) {
    return (result) => {
        if (result.deleteCount === 1) {
            return reply().code(204)
        }
        reply(notFound())
    }
}
