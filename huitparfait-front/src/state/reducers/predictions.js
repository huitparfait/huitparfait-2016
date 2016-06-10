import { FETCH_PREDICTIONS, FETCH_PREDICTIONS_FAILURE, FETCH_PREDICTIONS_SUCCESS } from '../actions/predictions'

const initialState = null

export default function (state = initialState, action) {

    switch (action.type) {

        case FETCH_PREDICTIONS_SUCCESS:
            return action.predictions

        case FETCH_PREDICTIONS:
        case FETCH_PREDICTIONS_FAILURE:
            return null

        default:
            return state
    }
}
