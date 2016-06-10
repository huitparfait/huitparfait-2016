import { calculateRanking } from '../services/rankingService'
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
                    calculateRanking({
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
