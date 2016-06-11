import _ from 'lodash'
import B from 'bluebird'
import { cypher } from '../infra/neo4j'
import { calculateClassicPoints, calculateRiskPoints } from './calculatePoints'

export function calculatePronostic() {
    return fetchGames()
        .then((games) => {
            return fetchPronosticByGames(games)
                .then((pronostics) => {
                    return calculateClassicPointsByPronostic(games, pronostics)
                })
                .then(savePoints)
        })
        .catch((err) => {
            console.error('Error calculator ranking', err)
        })
        .finally(() => {
            console.log('Calculate Points OK')
        })
}


function fetchGames() {
    return cypher(`
        MATCH (g:Game)
        WHERE g.startsAt < timestamp()

        MATCH (p:Pronostic)-[IS_ABOUT_GAME]->(g)
        MATCH (ta:Team)-[piga:PLAYS_IN_GAME { order: 1 }]->(g)
        MATCH (tb:Team)-[pigb:PLAYS_IN_GAME { order: 2 }]->(g)
        WHERE 
            piga.goals IS NOT NULL 
            AND pigb.goals IS NOT NULL
        RETURN g.id as gameId, 
               piga.goals as goalsTeamA, 
               pigb.goals as goalsTeamB`)
}

function fetchPronosticByGames(games) {
    console.log(`Fetch Pronostic By Games: ${games.length}`)
    if (_.isEmpty(games)) {
        return B.resolve()
    }

    const gameIds = _.map(games, 'gameId')

    return cypher(`
        MATCH (g:Game)
        WHERE g.id IN { gameIds }

        MATCH (p:Pronostic)-[IS_ABOUT_GAME]->(g)
        WHERE 
               p.id IS NOT NULL
               AND p.classicPoints IS NULL
        MATCH (ta:Team)-[:PLAYS_IN_GAME { order: 1 }]->(g)
        MATCH (tb:Team)-[:PLAYS_IN_GAME { order: 2 }]->(g)
        MATCH (p)-[sa:PREDICT_SCORE]->(ta)
        MATCH (p)-[sb:PREDICT_SCORE]->(tb)
        MATCH (p)-[pr:PREDICT_RISK]->(r:Risk)
        MATCH (r)-[ug:USED_FOR_GAME]->(g)

        RETURN g.id as gameId, 
               p.id as pronosticId, 
               sa.goals as goalsTeamA, 
               sb.goals as goalsTeamB, 
               pr.willHappen as willHappen, 
               pr.amount as amount,
               ug.happened as happened`,
        {
            gameIds: gameIds,
        })
}

function savePoints(pronostics) {
    console.log(`Save Points: Pronostics: ${pronostics.length}`)

    if (_.isEmpty(pronostics)) {
        return B.resolve([])
    }

    return cypher(`
        FOREACH (pronostic in {pronostics} | 
            MERGE (p:Pronostic { id: pronostic.pronosticId }) 
            SET 
               p.classicPoints = pronostic.classicPoints,
               p.riskPoints = pronostic.riskPoints
        )`,
        {
            pronostics: pronostics,
        })
        .return(pronostics)
}

function calculateClassicPointsByPronostic(games = [], pronostics = []) {
    console.log(`Calcul classic points by pronostics: Games: ${games.length}, Pronostics: ${pronostics.length}`)
    const gamesById = _.keyBy(games, 'gameId')

    return B
        .filter(pronostics, pronosticIsValid)
        .map((pronostic) => {
            const currentGame = gamesById[pronostic.gameId]

            return calculatePointsByPronostic(pronostic, currentGame)
        })

    function pronosticIsValid(pronostic) {
        return pronostic.pronosticId != null && pronostic.gameId != null && gamesById[pronostic.gameId] != null
    }

    function calculatePointsByPronostic(pronostic, currentGame) {
        try {
            pronostic.classicPoints = calculateClassicPoints(pronostic, currentGame)
            pronostic.riskPoints = calculateRiskPoints({ ..._.pick(pronostic, 'happened', 'willHappen', 'amount') })
            return pronostic
        } catch (err) {
            console.log(`Error calcul pronostic with ${JSON.stringify(pronostic)}`, err)
        }
    }
}
