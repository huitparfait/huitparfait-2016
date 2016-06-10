/* eslint complexity: 0 */
import {
    FETCH_CURRENT_USER,
    FETCH_CURRENT_USER_SUCCESS,
    NO_CONNECTED_USER,
    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
} from '../actions/user'
import {
    FETCH_USER_GROUPS,
    FETCH_USER_GROUPS_SUCCESS,
    FETCH_USER_GROUPS_FAILURE,
    FETCH_GROUP,
    FETCH_GROUP_SUCCESS,
    FETCH_GROUP_FAILURE,
    FETCH_GROUP_USERS,
    FETCH_GROUP_USERS_SUCCESS,
    FETCH_GROUP_USERS_FAILURE,
    UPSERT_GROUP,
    UPSERT_GROUP_SUCCESS,
    UPSERT_GROUP_FAILURE,
    DELETE_GROUP,
    DELETE_GROUP_SUCCESS,
    DELETE_GROUP_FAILURE,
} from '../actions/groups'
import {
    FETCH_PREDICTIONS,
    FETCH_PREDICTIONS_SUCCESS,
    FETCH_PREDICTIONS_FAILURE,
    SAVE_PREDICTION,
    SAVE_PREDICTION_SUCCESS,
    SAVE_PREDICTION_FAILURE,
} from '../actions/predictions'

const initialState = 0

export default function (state = initialState, action) {

    switch (action.type) {

        case FETCH_CURRENT_USER:
        case UPDATE_PROFILE:
        case FETCH_USER_GROUPS:
        case FETCH_GROUP:
        case FETCH_GROUP_USERS:
        case UPSERT_GROUP:
        case DELETE_GROUP:
        case FETCH_PREDICTIONS:
        case SAVE_PREDICTION:
            return state + 1

        case FETCH_CURRENT_USER_SUCCESS:
        case NO_CONNECTED_USER:
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PROFILE_FAILURE:
        case FETCH_USER_GROUPS_SUCCESS:
        case FETCH_USER_GROUPS_FAILURE:
        case FETCH_GROUP_SUCCESS:
        case FETCH_GROUP_FAILURE:
        case FETCH_GROUP_USERS_SUCCESS:
        case FETCH_GROUP_USERS_FAILURE:
        case UPSERT_GROUP_SUCCESS:
        case UPSERT_GROUP_FAILURE:
        case DELETE_GROUP_SUCCESS:
        case DELETE_GROUP_FAILURE:
        case FETCH_PREDICTIONS_SUCCESS:
        case FETCH_PREDICTIONS_FAILURE:
        case SAVE_PREDICTION_SUCCESS:
        case SAVE_PREDICTION_FAILURE:
            return state - 1

        default:
            return state
    }
}
