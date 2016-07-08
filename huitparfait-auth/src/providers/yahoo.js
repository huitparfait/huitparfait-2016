import _ from 'lodash'
import Joi from 'joi'
import { findOrCreateUserByProfile } from '../user-service'
import request from 'request-promise'

const schema = Joi.object({
    clientId: Joi.string().required(),
    clientSecret: Joi.string().required(),
}).required()

exports.register = function (server, options, next) {

    Joi.assert(options, schema)

    const cookieConfig = _.get(server, 'connections[0].states.settings')

    server.auth.strategy('yahoo', 'bell', {
        provider: 'yahoo',
        clientId: options.clientId,
        clientSecret: options.clientSecret,
        location: server.info.uri,
        isSecure: cookieConfig.isSecure,
        password: cookieConfig.password,
        ttl: cookieConfig.ttl,
    })

    server.route({
        method: 'GET',
        path: '/auth/yahoo',
        config: {
            auth: 'yahoo',
            handler: authYahoo,
        },
    })

    next()
}


exports.register.attributes = {
    name: 'yahoo',
}


function authYahoo(req, reply) {
    const creds = req.auth.credentials.profile

    const options = {
        url: `https://social.yahooapis.com/v1/user/${creds.id}/profile?format=json`,
        headers: { Authorization: `Bearer ${req.auth.credentials.token}` },
        rejectUnauthorized: false,
        json: true,
    }

    request.get(options)
        .then((fullProfile) => {

            const profile = {
                name: creds.displayName,
                email: _.get(fullProfile, 'profile.emails[0].handle'),
                avatarUrl: _.get(fullProfile, 'profile.image.imageUrl'),
                oAuthId: creds.id,
                oAuthProvider: 'yahoo',
            }

            return findOrCreateUserByProfile(profile)
        })
        .then((token) => {
            reply()
                .state('token', token, { path: '/' })
                .redirect('/')
        })
        .catch(reply)
}
