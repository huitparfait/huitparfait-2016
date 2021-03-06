import Joi from 'joi'

const schema = Joi.object({
    jwtPublicKey: Joi.string().required(),
}).required()

exports.register = function (server, options = {}, next) {

    Joi.assert(options, schema)

    server.auth.strategy('jwt', 'jwt', {
        key: options.jwtPublicKey,
        validateFunc: validate,
        verifyOptions: { algorithms: ['RS256'] },
    })

    server.auth.default('jwt')

    next()
}


exports.register.attributes = {
    name: 'auth',
}


function validate(decoded, req, callback) {
    return callback(null, decoded.id != null)
}
