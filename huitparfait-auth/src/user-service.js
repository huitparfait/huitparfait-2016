import Config from './infra/config'
import { sign } from './infra/jwt'
import request from 'request-promise'

const apiClient = request.defaults({ baseUrl: Config.get('proxy.url') })

export function findOrCreateUserByProfile(profile) {

    return apiClient.post('/api/users/me', { json: profile }).then((result) => {
        profile.id = result.id
        return sign(profile)
    })
}
