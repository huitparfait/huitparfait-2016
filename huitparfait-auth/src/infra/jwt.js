import JWT from 'jsonwebtoken'
import Config from './config'

const JWT_SECRET = Config.get('jwt.secret')

export function sign(object) {
    return JWT.sign(object, JWT_SECRET)
}
