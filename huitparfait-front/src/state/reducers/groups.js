import _ from 'lodash'
import {
    FETCH_USER_GROUPS_SUCCESS,
    FETCH_USER_GROUPS_FAILURE,
    UPSERT_GROUP_SUCCESS,
    UPSERT_GROUP_FAILURE,
    DELETE_GROUP,
    DELETE_GROUP_FAILURE
} from '../actions/groups'

const initialState = [];

export default function (state = initialState, action) {

    switch (action.type) {

        case FETCH_USER_GROUPS_SUCCESS:
            return _.sortBy(action.groups, (group) => group.name.toLowerCase())

        case FETCH_USER_GROUPS_FAILURE:
            return []

        case UPSERT_GROUP_SUCCESS:
            return _.sortBy([
                ...state.filter((group) => {
                    return group.id !== action.group.id
                }),
                action.group,
            ], (group) => group.name.toLowerCase())

        case UPSERT_GROUP_FAILURE:
            return state.filter((group) => {
                return group.id !== action.group.id
            })

        case DELETE_GROUP:
            return state.filter((group) => {
                return group.id !== action.group.id
            })

        case DELETE_GROUP_FAILURE:
            return [
                ...state,
                action.group,
            ]

        default:
            return state
    }
}