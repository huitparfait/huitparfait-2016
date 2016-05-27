import B from 'bluebird'
import neo4j from 'neo4j'
import _ from 'lodash'
import Config from './config'
import { notFound } from 'boom'

const db = new neo4j.GraphDatabase(Config.get('neo4j.url'))

export function cypher(fatQuery, params) {

    // Our queries have a lot of spaces and line feeds for readability.
    // To simplify errors messages from neo, we send it one-line queries ;-)
    const query = fatQuery.replace(/\s+/g, ' ')

    return B
        .promisify(db.cypher, { context: db })({ query, params })
        .map(omitNull)
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
