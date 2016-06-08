import _ from 'lodash'
import {
    FETCH_RANKING_SUCCESS,
    FETCH_RANKING_FAILURE,
} from '../actions/ranking'

const initialState = []

export default function (state = initialState, action) {

    switch (action.type) {

        case FETCH_RANKING_SUCCESS:
            return _.sortBy(action.ranking, (group) => group.name.toLowerCase())

        case FETCH_RANKING_FAILURE:
            return []

        default:
            return state
    }
}
