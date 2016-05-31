import Config from './infra/config'

const PROXY_CONFIG = Config.get('proxy')

exports.register = function (server, options, next) {

    server.route([{
        method: 'GET',
        path: '/auth/logout',
        handler(req, reply) {
            req.auth.artifacts = null
            reply.unstate('token', { path: '/' })
            reply()
        },

    }, {
        method: '*',
        path: '/api/{apiPath*}',
        handler: {
            proxy: {
                passThrough: true,
                mapUri(req, callback) {
                    const url = `${PROXY_CONFIG.apiUrl}${req.path}`
                    const { auth: { token } } = req

                    callback(null, url, { authorization: `Bearer ${token}` })
                },
            },
        },
    }, {
        method: '*',
        path: '/{frontPath*}',
        config: {
            auth: false,
        },
        handler: {
            proxy: {
                passThrough: true,
                mapUri(req, callback) {
                    const url = `${PROXY_CONFIG.frontUrl}${req.path}`
                    callback(null, url)
                },
            },
        },
    }])

    next()
}


exports.register.attributes = {
    name: 'router',
}
