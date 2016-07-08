import { FETCH_GROUP_RANKING, FETCH_GROUP_RANKING_SUCCESS, FETCH_GROUP_RANKING_FAILURE } from '../actions/ranking'

const initialState = { ranking: [], page: 1 }

export default function (state = initialState, action) {

    switch (action.type) {

        case FETCH_GROUP_RANKING_SUCCESS:
            return {
                ranking: _.sortBy(action.groupRanking, (group) => group.name && group.name.toLowerCase()),
                page: action.page,
            }

        case FETCH_GROUP_RANKING:
        case FETCH_GROUP_RANKING_FAILURE:
            return { ranking: [], page: 1 }

        default:
            return state
    }
}
