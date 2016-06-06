export function calculateClassicPoints(predictGoals, game) {
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
    if (predictRisk.amount === 0) {
        return 0
    }

    if (predictRisk.willHappen === predictRisk.happened) {
        return predictRisk.amount
    }

    return predictRisk.amount / -1
}
