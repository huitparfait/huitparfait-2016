import _ from 'lodash'
import Joi from 'joi'
import { findOrCreateUserByProfile } from '../user-service'

const schema = Joi.object({
    clientId: Joi.string().required(),
    clientSecret: Joi.string().required(),
}).required()

exports.register = function (server, options, next) {

    Joi.assert(options, schema)

    const cookieConfig = _.get(server, 'connections[0].states.settings')

    server.auth.strategy('google', 'bell', {
        provider: 'google',
        clientId: options.clientId,
        clientSecret: options.clientSecret,
        location: server.info.uri,
        isSecure: cookieConfig.isSecure,
        password: cookieConfig.password,
    })

    server.route({
        method: 'GET',
        path: '/auth/google',
        config: {
            auth: {
                strategy: 'google',
                mode: 'try',
            },
            handler: authGoogle,
        },
    })

    next()
}


exports.register.attributes = {
    name: 'google',
}


function authGoogle(req, reply) {
    if (!req.auth.isAuthenticated) {
        console.error('Error no isAuthenticated', req.auth.error)

        return reply.redirect('/')
    }

    const creds = req.auth.credentials.profile

    const profile = {
        name: creds.displayName,
        email: _.get(creds, 'emails[0].value'),
        avatarUrl: _.get(creds, 'raw.image.url').replace(/sz=50$/, 'sz=250'),
        oAuthId: creds.id,
        oAuthProvider: 'google',
    }

    findOrCreateUserByProfile(profile)
        .then((token) => {
            reply()
                .state('token', token, { path: '/' })
                .redirect('/')
        })
        .catch((err) => {
            console.error('Error findOrCreateUserByProfile', err)

            reply.unstate('token', { path: '/' })
            reply.redirect('/')
        })
}
