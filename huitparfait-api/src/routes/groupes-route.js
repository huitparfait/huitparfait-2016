import Joi from 'joi'
import shortid from 'shortid'
import { cypher, cypherOne } from '../infra/neo4j'
import { sendEmpty, sendEmptyIfPositiveDeleteCount } from '../infra/replyUtils'

const shortIdSchema = Joi.string().required().regex(/^[a-zA-Z0-9-_]{7,14}$/)

exports.register = function (server, options, next) {

    server.route([
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
                    },
                    payload: Joi.object({
                        name: Joi.string().required(),
                        avatarUrl: Joi.string().uri({ scheme: 'https' }),
                    }).required(),
                },
                handler(req, reply) {
                    cypherOne(`
                        MATCH (u:User { id: {userId} })
                        MERGE (u)-[imog:IS_MEMBER_OF_GROUP { isAdmin: true }]->(g:Group { id: {groupId} })
                        ON CREATE SET imog.createdAt = timestamp(),
                                      imog.updatedAt = timestamp(),
                                      imog.isAdmin   = true,
                                      imog.isActive  = true,
                                      g.createdAt    = timestamp(),
                                      g.updatedAt    = timestamp(),
                                      g.id           = {groupId},
                                      g.name         = {groupName},
                                      g.avatarUrl    = {groupAvatarUrl}
                        ON MATCH SET  imog.updatedAt = timestamp(),
                                      g.updatedAt    = timestamp(),
                                      g.name         = {groupName},
                                      g.avatarUrl    = {groupAvatarUrl}
                        RETURN        g.id AS id,
                                      g.name AS name,
                                      g.avatarUrl AS avatarUrl, 
                                      1 AS userCount`,
                        {
                            userId: req.auth.credentials.id,
                            groupId: req.params.groupId,
                            groupName: req.payload.name,
                            groupAvatarUrl: req.payload.avatarUrl || null,
                        })
                        .then(reply)
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
        {
            method: 'GET',
            path: '/api/groups/{groupId}/users',
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
                        MATCH (:User { id: {userId} })-[:IS_MEMBER_OF_GROUP { isAdmin: true }]->(g:Group { id: {groupId} })
                        MATCH (u:User)-[m:IS_MEMBER_OF_GROUP]->(g)
                        RETURN u.id        AS id, 
                               u.name      AS name, 
                               u.avatarUrl AS avatarUrl, 
                               m.isAdmin   AS isAdmin, 
                               m.isActive  AS isActive`,
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
            method: 'POST',
            path: '/api/groups/{groupId}/users',
            config: {
                description: 'Create link between the user and a group',
                tags: ['api'],
                validate: {
                    params: {
                        groupId: shortIdSchema,
                    },
                },
                handler(req, reply) {
                    cypherOne(`
                        MATCH (u:User { id: {userId} }), (g:Group { id: {groupId} })
                        MERGE (u)-[m:IS_MEMBER_OF_GROUP]->(g)
                        ON CREATE SET 
                            m.createdAt = timestamp(), 
                            m.updatedAt = timestamp(), 
                            m.isActive  = true
                        RETURN m.createdAt AS unique`,
                        {
                            userId: req.auth.credentials.id,
                            groupId: req.params.groupId,
                        })
                        .then(sendEmpty(reply))
                        .catch(reply)
                },
            },
        },
        {
            method: 'PUT',
            path: '/api/groups/{groupId}/users/{userId}',
            config: {
                description: 'Update a user\'s active in a group',
                tags: ['api'],
                validate: {
                    params: {
                        groupId: shortIdSchema,
                        userId: shortIdSchema,
                    },
                    payload: {
                        isActive: Joi.boolean().required(),
                    },
                },
                handler(req, reply) {
                    cypherOne(`
                        MATCH (:User { id: {adminId} })-[:IS_MEMBER_OF_GROUP { isAdmin: true }]->(g:Group { id: {groupId} })
                        MATCH (u:User { id: {userId} })-[m:IS_MEMBER_OF_GROUP]->(g)
                        SET m.updatedAt = timestamp(),
                            m.isActive  = {isActive}
                        RETURN u.id AS id`,
                        {
                            adminId: req.auth.credentials.id,
                            groupId: req.params.groupId,
                            userId: req.params.userId,
                            isActive: req.payload.isActive,
                        })
                        .then(sendEmpty(reply))
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
