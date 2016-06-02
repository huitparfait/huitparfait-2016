export function fetchCurrentUser() {

    return new Promise((res) => {
        setTimeout(function () {
            res(execute('/users/me'))
        }, 1000)
    })
    return
}

export function fetchGroups() {
    return new Promise((res) => {
        setTimeout(function () {
            res(execute('/users/me/groups'))
        }, 3000)
    })
}

export function createGroup(newGroup) {
    return execute('/groups', { method: 'POST', body: newGroup })
}

export function fetchGroup(groupId) {
    return execute(`/groups/${groupId}`)
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

export function fetchGames() {
    return execute('/games')
}

function execute(url, opts = {}) {
    if (opts.body) {
        opts.body = JSON.stringify(opts.body)
    }
    const config = Object.assign({}, opts, {
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
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
