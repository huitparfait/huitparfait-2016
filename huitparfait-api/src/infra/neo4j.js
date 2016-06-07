import B from 'bluebird'
import neo4j from 'neo4j'
import _ from 'lodash'
import Config from './config'
import { notFound } from 'boom'
import Joi from 'joi'

const db = new neo4j.GraphDatabase(Config.get('neo4j.url'))
const dbCypherAsync = B.promisify(db.cypher, { context: db })


initialize({
    User: {
        id: { unique: true },
        email: { index: true },
    },
    Group: {
        id: { unique: true },
    },
    Team: {
        id: { unique: true },
    },
    Risk: {
        id: { unique: true },
    },
    Game: {
        id: { unique: true },
    },
    Pronostic: {
        id: { unique: true },
    },
})


export function cypher(fatQuery, params) {

    // Our queries have a lot of spaces and line feeds for readability.
    // To simplify errors messages from neo, we send it one-line queries ;-)
    const query = fatQuery.replace(/\s+/g, ' ')

    return dbCypherAsync({ query, params }).map(omitNull)
}

export function cypherOne(fatQuery, params) {
    return cypher(fatQuery, params).then((results) => {
        if (results != null && results.length === 1) {
            return results[0]
        }

        throw new notFound('Not unique result')
    })
}


function omitNull(item) {
    return _.omitBy(item, _.isNil)
}


function initialize(opts) {

    return B
        .reduce(Object.keys(opts), (result, nodeName) => {
            return B
                .map(Object.keys(opts[nodeName]), (propertyName) => {
                    return indexQueryByProperty(nodeName, propertyName)
                })
                .then((queries) => {
                    return result.concat(queries)
                })
        }, [])
        .filter((query) => query != null)
        .mapSeries((query) => cypher(query))


    function indexQueryByProperty(nodeName, propertyName) {
        const propOpts = Joi.attempt(opts[nodeName][propertyName], Joi.object({
            unique: Joi.boolean().default(false),
            index: Joi.boolean().default(false).when('unique', { is: false, then: Joi.valid(true).required() }),
        }))

        if (propOpts.unique) {
            return `CREATE CONSTRAINT ON (n:${nodeName}) ASSERT n.${propertyName} IS UNIQUE`
        }

        if (propOpts.index) {
            return `CREATE INDEX ON :${nodeName}(${propertyName})`
        }
    }
}
