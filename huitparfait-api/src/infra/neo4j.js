import neo4j from 'neo4j'
import Config from './config'

const db = new neo4j.GraphDatabase(Config.get('neo4j.url'))

export default function cypher(fatQuery, params) {

    // Our queries have a lot of spaces and line feeds for readability.
    // To simplify errors messages from neo, we send it one-line queries ;-)
    const query = fatQuery.replace(/\s+/g, ' ')

    return new Promise((resolve, reject) => {

        db.cypher({ query, params }, function (err, results) {

            if (err) {
                return reject(err)
            }

            return resolve(results)
        })
    })
}
