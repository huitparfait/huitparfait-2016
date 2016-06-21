import {
    fetchPredictions as apiFetchPredictions,
    savePrediction as apiSavePrediction,
} from '../../WebApi'

export const FETCH_PREDICTIONS = 'FETCH_PREDICTIONS'
function fetchPredictionsAttempt() {
    return {
        type: FETCH_PREDICTIONS,
    }
}

export const FETCH_PREDICTIONS_SUCCESS = 'FETCH_PREDICTIONS_SUCCESS'
function fetchPredictionsSuccess(predictions) {
    return {
        type: FETCH_PREDICTIONS_SUCCESS,
        predictions,
    }
}

export const FETCH_PREDICTIONS_FAILURE = 'FETCH_PREDICTIONS_FAILURE'
function fetchPredictionsFailure() {
    return {
        type: FETCH_PREDICTIONS_FAILURE,
    }
}

export function fetchPredictions(period) {

    return (dispatch) => {

        dispatch(fetchPredictionsAttempt())

        return apiFetchPredictions(period)
            .then((predictions) => dispatch(fetchPredictionsSuccess(predictions)))
            .catch(() => dispatch(fetchPredictionsFailure()))
    }
}

export const SAVE_PREDICTION = 'SAVE_PREDICTION'
function savePredictionAttempt(prediction) {
    return {
        type: SAVE_PREDICTION,
        prediction,
    }
}

export const SAVE_PREDICTION_SUCCESS = 'SAVE_PREDICTION_SUCCESS'
function savePredictionSuccess() {
    return {
        type: SAVE_PREDICTION_SUCCESS,
    }
}

export const SAVE_PREDICTION_FAILURE = 'SAVE_PREDICTION_FAILURE'
function savePredictionFailure() {
    return {
        type: SAVE_PREDICTION_FAILURE,
    }
}

export function savePrediction(game) {

    return (dispatch) => {

        dispatch(savePredictionAttempt(game))

        const prediction = {
            gameId: game.gameId,
            predictionScoreTeamA: game.predictionScoreTeamA,
            predictionScoreTeamB: game.predictionScoreTeamB,
            predictionRiskAnswer: game.predictionRiskAnswer,
            predictionRiskAmount: game.predictionRiskAnswer != null ? game.predictionRiskAmount : 0,
        }

        return apiSavePrediction(prediction)
            .then(() => dispatch(savePredictionSuccess()))
            // fix this with redux
            .catch((err) => {
                dispatch(savePredictionFailure())
                return Promise.reject(err)
            })
    }
}
