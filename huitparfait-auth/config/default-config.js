export default {
    env: {
        doc: 'The applicaton environment.',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV'
    },

    server: {
        url: {
            doc: 'Server url',
            format: 'url',
            default: 'http://localhost:3000',
            env: 'SERVER_URL'
        },
        port: {
            doc: 'Port to bind',
            format: 'port',
            default: 3000,
            env: 'PORT'
        }
    },

    cookie: {
        secret: {
            format: String,
            default: 'foobar',
            env: 'COOKIE_SECRET'
        },
        isSecure: {
            format: Boolean,
            default: false,
            env: 'COOKIE_IS_SECURE'
        },
        ttl: {
            format: 'duration',
            default: '30 days'
        }
    },

    jwt: {
        secret: {
            format: String,
            default: 'foobar',
            env: 'JWT_SECRET'
        }
    },

    proxy: {
        url: {
            format: String,
            default: 'http://localhost:3100',
            env: 'PROXY_URL'
        }
    },

    google: {
        clientId: {
            format: String,
            default: 'foobar',
            env: 'GOOGLE_CLIENT_ID'
        },
        clientSecret: {
            format: String,
            default: 'foobar',
            env: 'GOOGLE_CLIENT_SECRET'
        }
    },

    facebook: {
        clientId: {
            format: String,
            default: 'foobar',
            env: 'FACEBOOK_CLIENT_ID'
        },
        clientSecret: {
            format: String,
            default: 'foobar',
            env: 'FACEBOOK_CLIENT_SECRET'
        }
    }
}
