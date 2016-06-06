import Joi from 'joi'

const predictGoalsSchema = Joi
    .object({
        goalsTeamA: Joi.number().integer().required(),
        goalsTeamB: Joi.number().integer().required(),
    })
    .options({ stripUnknown: true })
    .required()

const predictRiskSchema = Joi
    .object({
        happened: Joi.boolean().required(),
        willHappen: Joi.boolean().allow(null).required(),
        amount: Joi.number().integer().min(0).max(3).integer(),
    })
    .options({ stripUnknown: true })
    .required()


export function calculateClassicPoints(predictGoals = {}, game = {}) {
    Joi.assert(predictGoals, predictGoalsSchema)
    Joi.assert(game, predictGoalsSchema)

    let classicPoints = 0

    if (predictGoals.goalsTeamA === game.goalsTeamA) {
        classicPoints++
    }
    if (predictGoals.goalsTeamB === game.goalsTeamB) {
        classicPoints++
    }

    if (findTeamWinner(game) === findTeamWinner(predictGoals)) {
        classicPoints += 3
    }

    return classicPoints
}

function findTeamWinner(game) {
    if (game.goalsTeamA > game.goalsTeamB) {
        return 'TeamA'
    }

    if (game.goalsTeamA < game.goalsTeamB) {
        return 'TeamB'
    }

    return 'Draw'
}

export function calculateRiskPoints(predictRisk) {
    Joi.assert(predictRisk, predictRiskSchema)

    if (predictRisk.willHappen == null) {
        return 0
    }

    if (predictRisk.willHappen === predictRisk.happened) {
        return predictRisk.amount
    }

    return predictRisk.amount / -1
}
