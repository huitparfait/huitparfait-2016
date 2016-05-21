import Config from './infra/config'

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
        require('h2o2'),
        require('bell'),
        require('hapi-auth-jwt2'),

        {
            register: require('./plugins/auth'),
            options: {
                jwtSecret: Config.get('jwt.secret'),
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

        require('./router'),
    ],
}
