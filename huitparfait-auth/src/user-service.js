import Bluebird from 'bluebird'
import { sign } from './infra/jwt'

export function findOrCreateUserByProfile(profile) {
  // TODO Call api/users/{profile.email}
  return Bluebird.resolve(profile).then((profile) => {
    return sign(profile)
  })
}
