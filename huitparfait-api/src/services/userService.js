import { generateSVGDataURIString } from 'identicons'
import initAnimalAdj from '../infra/animal-adj/animal-adj'

const animalAdj = initAnimalAdj('fr')

export function generateName(id) {
    return animalAdj(id)
}

export function betterUser(user = {}) {
    if (user.isAnonymous) {
        return {
            ...user,
            name: user.anonymousName,
            avatarUrl: generateSVGDataURIString(user.id, { width: 70, size: 3 }),
        }
    }

    return user
}
