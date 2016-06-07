import {
    fetchRanking as apiFetchRanking,
} from '../../WebApi'

export const FETCH_RANKING = 'FETCH_RANKING_GROUPS'
function fetchRankingAttempt() {
    return {
        type: FETCH_RANKING,
    }
}

export const FETCH_RANKING_SUCCESS = 'FETCH_RANKING_SUCCESS'
function fetchRankingSuccess(ranking) {
    return {
        type: FETCH_RANKING_SUCCESS,
        ranking,
    }
}

export const FETCH_RANKING_FAILURE = 'FETCH_RANKING_FAILURE'
function fetchRankingFailure() {
    return {
        type: FETCH_RANKING_FAILURE,
    }
}


export function fetchRanking() {

    return (dispatch) => {

        dispatch(fetchRankingAttempt())

        apiFetchRanking()
            .then((ranking) => dispatch(fetchRankingSuccess(ranking)))
            .catch(() => dispatch(fetchRankingFailure()))
    }
}
