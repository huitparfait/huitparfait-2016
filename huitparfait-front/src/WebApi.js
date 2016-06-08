import _ from 'lodash'

export function fetchCurrentUser() {
    return execute('/users/me')
}

export function updateProfile(profile) {
    return execute('/users/me', { method: 'PUT', body: profile })
}

export function fetchUserGroups() {
    return execute('/users/me/groups')
}

export function fetchGroup(groupId) {
    return execute(`/groups/${groupId}`)
}

export function fetchGroupUsers(groupId) {
    return execute(`/groups/${groupId}/users`)
}

export function fetchGroupRanking(groupId) {
    return execute(`/groups/${groupId}/ranking`)
}

export function upsertGroup({ id, name, avatarUrl }) {

    const body = { name }

    if (_.startsWith(avatarUrl, 'https://')) {
        body.avatarUrl = avatarUrl
    }

    return execute(`/groups/${id}`, { method: 'PUT', body })
}

export function deleteGroup(groupId) {
    return execute(`/groups/${groupId}`, { method: 'DELETE' })
}

export function fetchGroupMembers(groupId) {
    return execute(`/groups/${groupId}/users`)
}

export function toggleGroupMembership(groupId, userId, isActive) {
    return execute(`/groups/${groupId}/users/${userId}`, { method: 'PUT', body: { isActive } })
}

export function joinGroup(groupId) {
    return execute(`/groups/${groupId}/users`, { method: 'POST' })
}

export function fetchPredictions() {
    return execute('/users/me/predictions')
}

export function fetchRanking() {
    return execute('/ranking')
}

export function savePrediction(newPrediction) {
    return execute('/users/me/predictions', { method: 'POST', body: newPrediction })
}

function execute(url, opts = {}) {
    if (opts.body) {
        opts.body = JSON.stringify(opts.body)
    }
    const config = Object.assign({}, opts, {
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })

    return fetch(process.env.API_URL + url, config)
        .then(checkStatus)
        .then(parseJSON)
}

function parseJSON(response) {
    if (response.status === 204) {
        return
    }

    return response.json()
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    }

    return Promise.reject(new Error(response.statusText))
}
