import JWT from 'jsonwebtoken'
import Config from './config'
import fs from 'fs'

const JWT_PRIVATE_KEY_PATH = Config.get('jwt.privateKeyPath')
const JWT_PRIVATE_KEY = fs.readFileSync(JWT_PRIVATE_KEY_PATH, 'utf8')

export function sign(object, expiresIn = '1d') {
    return JWT.sign(object, JWT_PRIVATE_KEY, {
        expiresIn,
        algorithm: 'RS256',
    })
}
