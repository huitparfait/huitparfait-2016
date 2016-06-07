export default function (lang) {

    const data = require(`./animal-adj-data.${lang}.json`)

    const animalLength = data.animals.length
    const adjectivesLength = data.adjectives.length
    const totalLength = animalLength * adjectivesLength

    function ucfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
    }


    return function transform(input = Math.random()) {

        const lowerAlphaNumericString = String(input).toLowerCase().replace(/[^a-z0-9]/g, '')
        const reallyBigInteger = parseInt(lowerAlphaNumericString, 36)
        const integer = reallyBigInteger % totalLength

        const animalIndex = Math.floor(integer / animalLength)
        const animal = data.animals[animalIndex]

        const adjectiveIndex = integer % adjectivesLength
        const adjective = data.adjectives[adjectiveIndex]

        return ucfirst(`${animal.name} ${adjective[animal.genre]}`)
    }
}
