import { cypher } from '../infra/neo4j.js'

exports.register = function (server, options, next) {

    server.route([
        {
            method: 'GET',
            path: '/api/games',
            config: {
                description: 'List games',
                tags: ['api'],
                handler(req, reply) {
                    cypher(`
                        MATCH		(g:Game)
                        MATCH		(ta:Team)-[:PLAYS_IN_GAME {order: 1}]->(g)
                        MATCH		(tb:Team)-[:PLAYS_IN_GAME {order: 2}]->(g)
						MATCH		(r:Risk)-[:USED_FOR_GAME]->(g)
                        RETURN      g.id                AS gameId,
                                    g.phase             AS phase,
                                    g.city              AS city,
                                    g.name              AS gameName,
                                    g.stadium           AS stadium,
                                    g.startsAt          AS startsAt,
                                    ta.id               AS idTeamA,
                                    ta.countryCode      AS countryCodeTeamA,
                                    ta.countryName      AS countryNameTeamA,
                                    ta.group            AS group,
                                    tb.id               AS idTeamB,
                                    tb.countryCode      AS countryCodeTeamB,
                                    tb.countryName      AS countryNameTeamB,
									r.id				AS riskId,
									r.text				AS riskTitle
                        ORDER BY    g.playsAt`,
                        {})
                        .then(reply)
                        .catch(reply)
                },
            },
        },
        {
            method: 'PUT',
            path: '/api/predictions',
            config: {
                description: 'List games',
                tags: ['api'],
                handler(req, reply) {
                    // cypher(`
                    //     `,
                    //     {})
                    //     .then(reply)
                    //     .catch(reply)
                },
            },
        },
    ])

    next()
}


exports.register.attributes = {
    name: 'games-route',
}


