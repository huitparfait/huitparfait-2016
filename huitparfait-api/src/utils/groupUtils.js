import _ from 'lodash'
import Joi from 'joi'
import { generateSVGDataURIString } from 'identicons'

export const shortIdSchema = Joi.string().required().regex(/^[a-zA-Z0-9-_]{7,14}$/)

export default function (group) {

    const betterGroup = _.clone(group)

    betterGroup.slug = _.kebabCase(group.name)

    if (betterGroup.avatarUrl == null) {
        const identiconUrl = generateSVGDataURIString(betterGroup.id, { width: 70, size: 3 })
        betterGroup.avatarUrl = identiconUrl
    }

    return betterGroup
}
