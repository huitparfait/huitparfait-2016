import { cypherOne } from '../infra/neo4j'
import Bluebird from 'bluebird'
import _ from 'lodash'

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
                    .then(_.keyBy('name'))
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
