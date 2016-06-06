import { REQUEST_CURRENT_USER, CURRENT_USER_RECEIVED, NO_CONNECTED_USER } from './actions/user-actions'
import { REQUEST_USER_GROUPS, USER_GROUPS_RECEIVED, USER_GROUPS_ERROR } from './actions/userGroups-actions'

const initialState = { user: null, userGroups: null, loaders: 0 };

export default function (state = initialState, action) {

    switch (action.type) {

        case REQUEST_CURRENT_USER:
            return {
                ...state,
                user: null,
                loaders: state.loaders + 1,
            }

        case CURRENT_USER_RECEIVED:
            return {
                ...state,
                user: action.user,
                loaders: state.loaders - 1,
            }

        case CURRENT_USER_RECEIVED:
            return {
                ...state,
                user: action.user,
                loaders: state.loaders - 1,
            }

        case NO_CONNECTED_USER:
            return {
                ...state,
                user: null,
                loaders: state.loaders - 1,
            }

        case REQUEST_USER_GROUPS:
            return {
                ...state,
                loaders: state.loaders + 1,
            }

        case USER_GROUPS_RECEIVED:
            return {
                ...state,
                userGroups: action.userGroups,
                loaders: state.loaders - 1,
            }

        case USER_GROUPS_ERROR:
            return {
                ...state,
                userGroups: [],
                loaders: state.loaders - 1,
            }

        default:
            return state
    }
}