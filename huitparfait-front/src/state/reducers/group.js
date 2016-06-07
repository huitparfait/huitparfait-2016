import { FETCH_GROUP, FETCH_GROUP_SUCCESS, FETCH_GROUP_FAILURE, UPSERT_GROUP_SUCCESS } from '../actions/groups'

const initialState = null;

export default function (state = initialState, action) {

    switch (action.type) {

        case FETCH_GROUP_SUCCESS:
        case UPSERT_GROUP_SUCCESS:
            return action.group

        case FETCH_GROUP:
        case FETCH_GROUP_FAILURE:
            return null

        default:
            return state
    }
}