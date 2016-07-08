import * as api from '../../WebApi'

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

        api.fetchRanking()
            .then((ranking) => dispatch(fetchRankingSuccess(ranking)))
            .catch(() => dispatch(fetchRankingFailure()))
    }
}


export const FETCH_GROUP_RANKING = 'FETCH_GROUP_RANKING'
function fetchGroupRankingAttempt() {
    return {
        type: FETCH_GROUP_RANKING,
    }
}

export const FETCH_GROUP_RANKING_SUCCESS = 'FETCH_GROUP_RANKING_SUCCESS'
function fetchGroupRankingSuccess(groupRanking, page) {
    return {
        type: FETCH_GROUP_RANKING_SUCCESS,
        page,
        groupRanking,
    }
}

export const FETCH_GROUP_RANKING_FAILURE = 'FETCH_GROUP_RANKING_FAILURE'
function fetchGroupRankingFailure() {
    return {
        type: FETCH_GROUP_RANKING_FAILURE,
    }
}

export function fetchGroupRanking(groupId, page) {

    return (dispatch) => {

        dispatch(fetchGroupRankingAttempt())

        api.fetchGroupRanking(groupId, page)
            .then((ranking) => dispatch(fetchGroupRankingSuccess(ranking, page)))
            .catch(() => dispatch(fetchGroupRankingFailure()))
    }
}
