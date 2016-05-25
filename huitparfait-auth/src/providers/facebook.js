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

    server.auth.strategy('facebook', 'bell', {
        provider: 'facebook',
        clientId: options.clientId,
        clientSecret: options.clientSecret,
        location: server.info.uri,
        isSecure: cookieConfig.isSecure,
        password: cookieConfig.password,
    })

    server.route({
        method: 'GET',
        path: '/auth/facebook',
        config: {
            auth: 'facebook',
            handler: authFacebook,
        },
    })

    next()
}


exports.register.attributes = {
    name: 'facebook',
}


function authFacebook(req, reply) {

    const creds = req.auth.credentials.profile

    const profile = {
        name: creds.displayName,
        email: creds.email,
        // TODO redirect
        avatarUrl: `https://graph.facebook.com/${creds.id}/picture?width=250&height=250`,
    }

    findOrCreateUserByProfile(profile)
        .then((token) => {
            reply()
                .state('token', token, { path: '/' })
                .redirect('/')
        })
        .catch(reply)

}
