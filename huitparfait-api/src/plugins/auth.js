import Joi from 'joi'
import shortid from 'shortid'

const schema = Joi.object({
    jwtPublicKey: Joi.string().required(),
}).required()

exports.register = function (server, options = {}, next) {

    Joi.assert(options, schema)

    // All queries must have a header "Authorization: Bearer [JWT]"

    // Almost all queries need a JWT which identifies the user requesting the data
    server.auth.strategy('jwt', 'jwt', {
        key: options.jwtPublicKey,
        validateFunc: validate,
        verifyOptions: { algorithms: ['RS256'] },
    })

    server.auth.default('jwt')

    // For some particular queries (like login)
    // JWT is "anonymous" and its only purpose is to prove that requests comes from
    // an authorized party (who has the private key corresponding to the public key)
    server.auth.strategy('jwt-anonymous', 'jwt', {
        key: options.jwtPublicKey,
        validateFunc: validateAnonymous,
        verifyOptions: { algorithms: ['RS256'] },
    })

    next()
}


exports.register.attributes = {
    name: 'auth',
}


function validate(decoded, req, callback) {
    return callback(null, shortid.isValid(decoded.id))
}

function validateAnonymous(decoded, req, callback) {
    return callback(null, decoded.anonymous === true)
}
