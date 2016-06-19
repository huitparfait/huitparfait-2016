import Joi from 'joi'
import { generateId } from '../infra/utils'
import { cypher, cypherOne } from '../infra/neo4j'
import { betterGroup } from '../services/groupService'
import { generateName } from '../services/userService'
import _ from 'lodash'
import moment from 'moment'

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
                        avatarUrl: Joi.string().uri({ scheme: 'https' }),
                        oAuthId: Joi.string(),
                        oAuthProvider: Joi.string(),
                    }).required(),
                },
                handler(req, reply) {

                    const userId = generateId()
                    const anonymousName = generateName(userId)

                    cypherOne(`
                        MERGE         (u:User { email: {email} })
                        ON CREATE SET u.createdAt        = timestamp(),
                                      u.updatedAt        = timestamp(),
                                      u.id               = {userId},
                                      u.name             = {name},
                                      u.anonymousName    = {anonymousName},
                                      u.email            = {email},
                                      u.avatarUrl        = {avatarUrl},
                                      u.oAuthId          = {oAuthId},
                                      u.oAuthProvider    = {oAuthProvider},
                                      u.lastConnectionAt = timestamp(),
                                      u.isAnonymous      = false
                        ON MATCH SET  u.lastConnectionAt = timestamp()
                        RETURN        u.id            AS id,
                                      u.name          AS name,
                                      u.anonymousName AS anonymousName,
                                      u.avatarUrl     AS avatarUrl,
                                      u.isAnonymous   AS isAnonymous`,
                        {
                            userId,
                            email: req.payload.email,
                            name: req.payload.name,
                            oAuthId: req.payload.oAuthId,
                            oAuthProvider: req.payload.oAuthProvider,
                            anonymousName,
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
            config: {
                description: 'Read user infos',
                tags: ['api'],
                handler(req, reply) {
                    cypherOne(`
                        MATCH (u:User { id: {id} })
                        RETURN u.id            AS id,
                               u.name          AS name,
                               u.anonymousName AS anonymousName,
                               u.avatarUrl     AS avatarUrl,
                               u.isAnonymous   AS isAnonymous`,
                        {
                            id: req.auth.credentials.id,
                        })
                        .then(reply)
                        .catch(reply)
                },
            },
        },
        {
            method: 'PUT',
            path: '/api/users/me',
            config: {
                description: 'Update user\'s infos',
                tags: ['api'],
                validate: {
                    payload: {
                        name: Joi.string(),
                        avatarUrl: Joi.string().uri({ scheme: 'https' }),
                        isAnonymous: Joi.boolean(),
                    },
                },
                handler(req, reply) {
                    cypherOne(`
                        MATCH (u:User { id: {userId} })
                        SET u.updatedAt   = timestamp(),
                            u.name        = {userName},
                            u.avatarUrl   = {userAvatarUrl}, 
                            u.isAnonymous = {userIsAnonymous}
                        RETURN u.id            AS id,
                               u.name          AS name,
                               u.anonymousName AS anonymousName,
                               u.avatarUrl     AS avatarUrl, 
                               u.isAnonymous   AS isAnonymous`,
                        {
                            userId: req.auth.credentials.id,
                            userName: req.payload.name,
                            userAvatarUrl: req.payload.avatarUrl || null,
                            userIsAnonymous: req.payload.isAnonymous,
                        })
                        .then(reply)
                        .catch(reply)
                },
            },
        },
        {
            method: 'GET',
            path: '/api/users/me/groups',
            config: {
                description: 'Read user\'s groups',
                tags: ['api'],
                handler(req, reply) {
                    cypher(`
                        MATCH    (:User { id:{id} })-[imog:IS_MEMBER_OF_GROUP { isActive: true }]->(g:Group)
                        MATCH    (u:User)-[:IS_MEMBER_OF_GROUP { isActive: true }]->(g)
                        RETURN   g.name               AS name,
                                 g.avatarUrl          AS avatarUrl,
                                 g.id                 AS id,
                                 imog.isAdmin         AS isAdmin,
                                 count(DISTINCT u.id) AS userCount
                        ORDER BY lower(g.name)`,
                        {
                            id: req.auth.credentials.id,
                        })
                        .map(betterGroup)
                        .then(reply)
                        .catch(reply)
                },
            },
        },
        {
            method: 'GET',
            path: '/api/users/me/predictions/{period}',
            config: {
                description: 'List games',
                tags: ['api'],
                handler(req, reply) {
                    cypher(`
                        MATCH          (g:Game)
                        MATCH          (ta:Team)-[piga:PLAYS_IN_GAME {order: 1}]->(g)
                        MATCH          (tb:Team)-[pigb:PLAYS_IN_GAME {order: 2}]->(g)
                        MATCH          (r:Risk)-[ufg:USED_FOR_GAME]->(g)
                        OPTIONAL MATCH (g)<-[:IS_ABOUT_GAME]-(p:Pronostic)-[:CREATED_BY_USER]->(u:User { id: {userId} })
                        OPTIONAL MATCH (p)-[sa:PREDICT_SCORE]->(ta)
                        OPTIONAL MATCH (p)-[sb:PREDICT_SCORE]->(tb)
                        OPTIONAL MATCH (p)-[pr:PREDICT_RISK]->(r:Risk)
                        RETURN   g.id            AS gameId,
                                 g.phase         AS phase,
                                 g.city          AS city,
                                 g.name          AS gameName,
                                 g.stadium       AS stadium,
                                 g.startsAt      AS startsAt,
                                 ta.id           AS idTeamA,
                                 ta.countryCode  AS countryCodeTeamA,
                                 ta.countryName  AS countryNameTeamA,
                                 ta.group        AS group,
                                 tb.id           AS idTeamB,
                                 tb.countryCode  AS countryCodeTeamB,
                                 tb.countryName  AS countryNameTeamB,
                                 piga.goals      AS goalsTeamA,
                                 pigb.goals      AS goalsTeamB,
                                 r.id            AS riskId,
                                 r.text          AS riskTitle,
                                 sa.goals        AS predictionScoreTeamA,
                                 sb.goals        AS predictionScoreTeamB,
                                 pr.willHappen   AS predictionRiskAnswer,
                                 pr.amount       AS predictionRiskAmount,
                                 p.classicPoints AS classicPoints,
                                 p.riskPoints    AS riskPoints,
                                 ufg.happened    AS riskHappened
                        ORDER BY g.startsAt
                        `,
                        {
                            userId: req.auth.credentials.id,
                        })
                        .then((predictions) => {

                            const allDates = _(predictions)
                                .map((game) => moment(game.startsAt).startOf('day').valueOf())
                                .uniq()
                                .value()

                            const today = moment().startOf('day').valueOf()
                            const nextDay = _(allDates).find((day) => day >= today)
                            const previousDay = _(allDates).slice().reverse().find((day) => day < today)

                            return _(predictions)
                                .filter((game) => {

                                    const dayOfGame = moment(game.startsAt).startOf('day').valueOf()

                                    if (req.params.period === 'previous-days') {
                                        return dayOfGame <= previousDay
                                    }

                                    if (req.params.period === 'next-days') {
                                        return dayOfGame >= nextDay
                                    }

                                    return true
                                })
                                .thru((allPredictions) => {

                                    if (req.params.period === 'previous-days') {
                                        return _(allPredictions).slice().reverse().value()
                                    }

                                    return allPredictions
                                })
                                .map((game) => {

                                    // Initialize amount of risked points to the maximum if not defined
                                    game.predictionRiskAmount = game.predictionRiskAmount || 3

                                    // Calculate the total number of points for a prediction
                                    if (game.classicPoints != null) {
                                        game.points = game.classicPoints + (game.riskPoints || 0)
                                    }

                                    return game
                                })
                                .groupBy((game) => {
                                    return moment(game.startsAt).startOf('day')
                                })
                        })
                        .then(reply)
                        .catch(reply)
                },
            },
        },
        {
            method: 'POST',
            path: '/api/users/me/predictions',
            config: {
                description: 'Save a user\'s prediction about a game',
                tags: ['api'],
                validate: {
                    payload: {
                        gameId: Joi.string(),
                        predictionScoreTeamA: Joi.number().integer().min(0).required(),
                        predictionScoreTeamB: Joi.number().integer().min(0).required(),
                        predictionRiskAnswer: Joi.boolean(),
                        predictionRiskAmount: Joi.number().integer().min(0).max(3).required(),
                    },
                },
                handler(req, reply) {
                    const pronosticId = generateId()

                    cypherOne(`
                        MATCH (u:User { id: {userId} })
                        MATCH (g:Game { id: {gameId} })
                        WHERE g.startsAt > timestamp()

                        MATCH (ta:Team)-[:PLAYS_IN_GAME { order: 1 }]->(g)
                        MATCH (tb:Team)-[:PLAYS_IN_GAME { order: 2 }]->(g)
                        MATCH (r:Risk)-[:USED_FOR_GAME]->(g)
                        
                        MERGE (g)<-[:IS_ABOUT_GAME]-(p:Pronostic)-[:CREATED_BY_USER]->(u)
                        ON CREATE SET   p.createdAt = timestamp(),
                                        p.updatedAt = timestamp(),
                                        p.id        = {pronosticId}
                        ON MATCH SET    p.updatedAt = timestamp()
                        
                        MERGE (p)-[sa:PREDICT_SCORE]->(ta)
                        SET sa.goals = {predictionScoreTeamA}
                        
                        MERGE (p)-[sb:PREDICT_SCORE]->(tb)
                        SET sb.goals = {predictionScoreTeamB}
                        
                        MERGE (p)-[pr:PREDICT_RISK]->(r)
                        SET pr.willHappen = {predictionRiskAnswer}
                        SET pr.amount = {predictionRiskAmount}
                        
                        RETURN p
                        `,
                        {
                            userId: req.auth.credentials.id,
                            gameId: req.payload.gameId,
                            predictionScoreTeamA: req.payload.predictionScoreTeamA,
                            predictionScoreTeamB: req.payload.predictionScoreTeamB,
                            predictionRiskAnswer: req.payload.predictionRiskAnswer != null ? req.payload.predictionRiskAnswer : null,
                            predictionRiskAmount: req.payload.predictionRiskAmount,
                            pronosticId,
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
