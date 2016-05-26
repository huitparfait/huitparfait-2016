import { notFound } from 'boom'

export function sendCreated(reply, locationPrefix) {
    return (result) => {
        reply().created(`${locationPrefix}${result.id}`)
    }
}

export function sendEmpty(reply) {
    return () => {
        reply().code(204)
    }
}

export function sendEmptyIfPositiveDeleteCount(reply) {
    return (result) => {
        if (result.deleteCount === 1) {
            return reply().code(204)
        }
        reply(notFound())
    }
}
