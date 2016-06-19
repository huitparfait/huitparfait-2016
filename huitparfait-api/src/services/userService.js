import { generateSVGDataURIString } from 'identicons'
import initAnimalAdj from '../infra/animal-adj/animal-adj'

const animalAdj = initAnimalAdj('fr')

export function generateName(id) {
    return animalAdj(id)
}

export function betterUser(user = {}, transformAnonymous = false) {

    if (user.isAnonymous && transformAnonymous) {
        return {
            id: user.userId,
            name: user.anonymousName,
            avatarUrl: generateSVGDataURIString(user.userId, { width: 70, size: 3 }),
        }
    }

    return {
        id: user.userId,
        name: user.userName,
        avatarUrl: user.avatarUrl,
    }
}
