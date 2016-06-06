import { fetchGroups, createGroup } from '../WebApi'

export const REQUEST_USER_GROUPS = 'REQUEST_USER_GROUPS'
function requestUserGroups() {
    return {
        type: REQUEST_USER_GROUPS,
    }
}

export const USER_GROUPS_RECEIVED = 'USER_GROUPS_RECEIVED'
function userGroupsReceived(userGroups) {
    return {
        type: USER_GROUPS_RECEIVED,
        userGroups,
    }
}

export const USER_GROUPS_ERROR = 'USER_GROUPS_ERROR'
function userGroupError() {
    return {
        type: USER_GROUPS_ERROR,
    }
}

export function getUserGroups() {

    return (dispatch) => {

        dispatch(requestUserGroups())

        fetchGroups()
            .then((userGroups) => dispatch(userGroupsReceived(userGroups)))
            .catch(() => dispatch(userGroupError()))
    }
}

export const REQUEST_NEW_GROUP = 'REQUEST_NEW_GROUP'
function requestNewGroup(newGroup) {
    return {
        type: REQUEST_NEW_GROUP,
        newGroup,
    }
}

export const NEW_GROUP_SUCCESS = 'NEW_GROUP_SUCCESS'
function userGroupsReceived() {
    return {
        type: NEW_GROUP_SUCCESS,
    }
}

export const NEW_GROUP_ERROR = 'NEW_GROUP_ERROR'
function userGroupError(newGroup) {
    return {
        type: NEW_GROUP_ERROR,
        newGroup,
    }
}

export function addNewGroup(newGroup) {

    return (dispatch) => {

        dispatch(requestNewGroup(newGroup))

        fetchGroups()
            .then((userGroups) => dispatch(ne(userGroups)))
            .catch(() => dispatch(userGroupError()))
    }
}