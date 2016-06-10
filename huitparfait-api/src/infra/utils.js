import Joi from 'joi'
import shortid from 'shortid'

export const shortIdSchema = Joi.string().required().regex(/^[a-zA-Z0-9-_]{7,14}$/)

export function generateId() {
    return shortid()
}
