import Config from './infra/config'
import fs from 'fs'
import url from 'url'

const JWT_PUBLIC_KEY_PATH = Config.get('jwt.publicKeyPath')
const JWT_PUBLIC_KEY = fs.readFileSync(JWT_PUBLIC_KEY_PATH, 'utf8')

const manifest = {
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
        require('./routes/ranking-route'),
    ],
}


if (Config.get('env') === 'development') {
    manifest.plugins.push(
        require('inert'),
        require('vision'),
        {
            register: require('hapi-swagger'),
            options: {
                host: url.parse(Config.get('server.url')).host,
                basePath: '/api',
                documentationPath: '/console',
                pathPrefixSize: 2,
                info: {
                    title: 'Huit Parfait API Documentation',
                },
            },
        }
    )
}

export default manifest
