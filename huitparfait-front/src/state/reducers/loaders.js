import {
    FETCH_CURRENT_USER,
    FETCH_CURRENT_USER_SUCCESS,
    NO_CONNECTED_USER,
    UPDATE_PROFILE,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE
} from '../actions/user'
import {
    FETCH_USER_GROUPS,
    FETCH_USER_GROUPS_SUCCESS,
    FETCH_USER_GROUPS_FAILURE,
    UPSERT_GROUP,
    UPSERT_GROUP_SUCCESS,
    UPSERT_GROUP_FAILURE,
    DELETE_GROUP,
    DELETE_GROUP_SUCCESS,
    DELETE_GROUP_FAILURE
} from '../actions/groups'

const initialState = 0;

export default function (state = initialState, action) {

    switch (action.type) {

        case FETCH_CURRENT_USER:
        case FETCH_USER_GROUPS:
        case UPSERT_GROUP:
        case DELETE_GROUP:
        case UPDATE_PROFILE:
            return state + 1

        case FETCH_CURRENT_USER_SUCCESS:
        case NO_CONNECTED_USER:
        case FETCH_USER_GROUPS_SUCCESS:
        case FETCH_USER_GROUPS_FAILURE:
        case UPSERT_GROUP_SUCCESS:
        case UPSERT_GROUP_FAILURE:
        case DELETE_GROUP_SUCCESS:
        case DELETE_GROUP_FAILURE:
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PROFILE_FAILURE:
            return state - 1

        default:
            return state
    }
}