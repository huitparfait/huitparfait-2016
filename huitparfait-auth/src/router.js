import Config from './infra/config'
import request from 'request-promise'
import { sign } from './infra/jwt'

const PROXY_CONFIG = Config.get('proxy')

exports.register = function (server, options, next) {

    server.route([
        {
            method: 'GET',
            path: '/auth/logout',
            handler(req, reply) {
                req.auth.artifacts = null
                reply.unstate('token', { path: '/' })
                reply.redirect('/')
            },

        },
        {
            method: 'PUT',
            path: '/api/users/me',
            handler(req, reply) {

                const options = {
                    method: 'PUT',
                    headers: { authorization: `Bearer ${req.auth.token}` },
                    body: req.payload,
                    json: true,
                }

                request(`${PROXY_CONFIG.apiUrl}${req.path}`, options)
                    .then((user) => {
                        const token = sign(user)
                        reply(user)
                            .state('token', token, { path: '/' })
                    })
                    .catch(reply)
            },
        },
        {
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
        },
        {
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
        },
    ])

    next()
}


exports.register.attributes = {
    name: 'router',
}
