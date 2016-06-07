import {
    FETCH_CURRENT_USER,
    FETCH_CURRENT_USER_SUCCESS,
    NO_CONNECTED_USER,
    UPDATE_PROFILE_SUCCESS
} from '../actions/user'

const initialState = null;

export default function (state = initialState, action) {

    switch (action.type) {

        // case FETCH_CURRENT_USER:
        case NO_CONNECTED_USER:
            return null

        case FETCH_CURRENT_USER_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:
            return action.user

        default:
            return state
    }
}