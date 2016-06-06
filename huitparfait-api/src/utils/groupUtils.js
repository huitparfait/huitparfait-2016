import _ from 'lodash'
import { generateSVGDataURIString } from 'identicons'

export default function (group) {

    const betterGroup = _.clone(group)

    betterGroup.slug = _.kebabCase(group.name)

    if (betterGroup.avatarUrl == null) {
        const identiconUrl = generateSVGDataURIString(betterGroup.id, { width: 70, size: 3 })
        betterGroup.avatarUrl = identiconUrl
    }

    return betterGroup
}