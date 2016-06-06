import { fetchCurrentUser } from '../WebApi'

export const REQUEST_CURRENT_USER = 'REQUEST_CURRENT_USER'
function requestCurrentUser() {
    return {
        type: REQUEST_CURRENT_USER,
    }
}

export const CURRENT_USER_RECEIVED = 'CURRENT_USER_RECEIVED'
function currentUserReceived(user) {
    return {
        type: CURRENT_USER_RECEIVED,
        user,
    }
}

export const NO_CONNECTED_USER = 'NO_CONNECTED_USER'
function noConnectedUser() {
    return {
        type: NO_CONNECTED_USER,
    }
}

export function getCurrentUser() {

    return (dispatch) => {

        dispatch(requestCurrentUser())

        fetchCurrentUser()
            .then((user) => dispatch(currentUserReceived(user)))
            .catch(() => dispatch(noConnectedUser()))
    }
}
