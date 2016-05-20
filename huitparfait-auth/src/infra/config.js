import convict from 'convict'
import schema from '../../config/default-config'

const conf = convict(schema)

conf.validate({ strict: true })

export default conf
