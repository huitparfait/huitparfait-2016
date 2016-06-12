import { cypherOne } from '../infra/neo4j'
import Bluebird from 'bluebird'
import moment from 'moment'

exports.register = function (server, options = {}, next) {

    server.route({
        method: 'GET',
        path: '/api/metrics',
        config: {
            auth: 'http-basic',
            handler(req, reply) {

                Bluebird
                    .mapSeries(['Game', 'Group', 'Pronostic', 'Risk', 'Team', 'User'], (nodeName) => {
                        return cypherOne(`MATCH (n:${nodeName}) RETURN "${nodeName}" as name, COUNT(n) as count`)
                    })
                    .reduce((result, metric) => {
                        result[metric.name] = metric.count
                        return result
                    }, {})
                    .then((dbMetrics) => {
                        return {
                            startedAt: moment(server.info.started).format(),
                            data: dbMetrics,
                        }
                    })
                    .then(reply)
                    .catch(reply)
            },
        },
    })

    next()
}


exports.register.attributes = {
    name: 'metrics',
}
