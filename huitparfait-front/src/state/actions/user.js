import { fetchCurrentUser as apiFetchCurrentUser, updateProfile as apiUpdateProfile } from '../../WebApi'

export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER'
function fetchCurrentUserAttempt() {
    return {
        type: FETCH_CURRENT_USER,
    }
}

export const FETCH_CURRENT_USER_SUCCESS = 'FETCH_CURRENT_USER_SUCCESS'
function fetchCurrentUserSuccess(user) {
    return {
        type: FETCH_CURRENT_USER_SUCCESS,
        user,
    }
}

export const NO_CONNECTED_USER = 'NO_CONNECTED_USER'
function noConnectedUser() {
    return {
        type: NO_CONNECTED_USER,
    }
}

export function fetchCurrentUser() {

    return (dispatch) => {

        dispatch(fetchCurrentUserAttempt())

        return apiFetchCurrentUser()
            .then((user) => dispatch(fetchCurrentUserSuccess(user)))
            .catch(() => dispatch(noConnectedUser()))
    }
}

export const UPDATE_PROFILE = 'UPDATE_PROFILE'
function updateProfileAttempt(profile) {
    return {
        type: UPDATE_PROFILE,
        profile,
    }
}

export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS'
function updateProfileSuccess(user) {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        user,
    }
}

export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE'
function updateProfileFailure() {
    return {
        type: UPDATE_PROFILE_FAILURE,
    }
}

export function updateProfile(profile) {

    return (dispatch) => {

        dispatch(updateProfileAttempt())

        return apiUpdateProfile(profile)
            .then((updatedProfile) => dispatch(updateProfileSuccess(updatedProfile)))
            .catch(() => dispatch(updateProfileFailure()))
    }
}
