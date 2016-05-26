import Config from './infra/config'
import fs from 'fs'

const JWT_PUBLIC_KEY_PATH = Config.get('jwt.publicKeyPath')
const JWT_PUBLIC_KEY = fs.readFileSync(JWT_PUBLIC_KEY_PATH, 'utf8')

export default {
    server: {
        connections: {
            router: {
                stripTrailingSlash: true,
            },
            routes: {
                security: {
                    hsts: {
                        includeSubdomains: true,
                    },
                    xframe: true,
                },
            },
        },
        debug: { request: ['error', 'uncaught'] },
    },

    connection: {
        port: Config.get('server.port'),
        uri: Config.get('server.url'),
        state: {
            password: Config.get('cookie.secret'),
            ttl: Config.get('cookie.ttl'),
            isSecure: Config.get('cookie.isSecure'),
            isHttpOnly: true,
        },
    },

    plugins: [
        require('hapi-auth-jwt2'),

        {
            register: require('./plugins/auth'),
            options: {
                jwtPublicKey: JWT_PUBLIC_KEY,
            },
        },

        require('./routes/users-route'),
        require('./routes/groupes-route'),
    ],
}
