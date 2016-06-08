import convict from 'convict'
import schema from '../../config/default-config'

const conf = convict(schema)

// if (process.env.NODE_ENV !== 'production') {
//     conf.loadFile(['config/config.json'])
// }

conf.validate({ strict: true })

export default conf
