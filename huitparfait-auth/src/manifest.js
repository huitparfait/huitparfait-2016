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
    },

    connection: {
        port: Config.get('server.port'),
        routes: {
            cors: {
                credentials: true,
                origin: ['*'],
            },
        },
        state: {
            password: Config.get('cookie.secret'),
            ttl: Config.get('cookie.ttl'),
            isSecure: Config.get('cookie.isSecure'),
            isHttpOnly: true,
        },
    },

    plugins: [
        require('h2o2'),
        require('bell'),
        require('hapi-auth-jwt2'),

        {
            register: require('./plugins/auth'),
            options: {
                jwtPublicKey: JWT_PUBLIC_KEY,
            },
        },
        {
            register: require('./providers/google'),
            options: Config.get('google'),
        },
        {
            register: require('./providers/facebook'),
            options: Config.get('facebook'),
        },
        {
            register: require('./providers/yahoo'),
            options: Config.get('yahoo'),
        },

        require('./router'),
    ],
}
