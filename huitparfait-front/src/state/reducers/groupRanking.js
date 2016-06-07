import { FETCH_GROUP_RANKING, FETCH_GROUP_RANKING_SUCCESS, FETCH_GROUP_RANKING_FAILURE } from '../actions/ranking'

const initialState = [];

export default function (state = initialState, action) {

    switch (action.type) {

        case FETCH_GROUP_RANKING_SUCCESS:
            return action.groupRanking

        case FETCH_GROUP_RANKING:
        case FETCH_GROUP_RANKING_FAILURE:
            return []

        default:
            return state
    }
}
