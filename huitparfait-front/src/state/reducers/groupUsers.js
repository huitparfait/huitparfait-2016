import { FETCH_GROUP_USERS, FETCH_GROUP_USERS_SUCCESS, FETCH_GROUP_USERS_FAILURE } from '../actions/groups'

const initialState = []

export default function (state = initialState, action) {

    switch (action.type) {

        case FETCH_GROUP_USERS_SUCCESS:
            return action.groupUsers

        case FETCH_GROUP_USERS:
        case FETCH_GROUP_USERS_FAILURE:
            return []

        default:
            return state
    }
}
