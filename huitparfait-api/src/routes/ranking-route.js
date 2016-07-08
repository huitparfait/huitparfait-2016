import Joi from 'joi'
import { calculateRanking, fetchCommonRankingWithPaginate } from '../services/rankingService'
import { calculatePronostic } from '../services/pronosticService'


exports.register = function (server, options, next) {

    server.route([
        {
            method: 'GET',
            path: '/api/ranking/general',
            config: {
                description: 'Fetch common ranking',
                tags: ['api'],
                validate: {
                    query: {
                        page: Joi.number().integer().min(0),
                        pageSize: Joi.number().integer().min(0).max(100),
                    },
                },
                handler(req, reply) {
                    fetchCommonRankingWithPaginate(req.query)
                        .then(reply)
                        .catch(reply)
                },
            },
        },
        {
            method: 'GET',
            path: '/api/ranking/{groupId}',
            config: {
                description: 'Fetch ranking',
                tags: ['api'],
                validate: {
                    query: {
                        page: Joi.number().integer().min(0),
                        pageSize: Joi.number().integer().min(0),
                    },
                },
                handler(req, reply) {
                    calculateRanking({
                        ...req.query,
                        userId: req.auth.credentials.id,
                        groupId: req.params.groupId,
                    })
                        .then(reply)
                        .catch(reply)
                },
            },
        },
        {
            method: 'GET',
            path: '/api/ranking/calculate',
            config: {
                auth: 'http-basic',
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
