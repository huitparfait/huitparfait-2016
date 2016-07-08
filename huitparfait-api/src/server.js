import { Server } from 'hapi'
import Manifest from './manifest'

const server = new Server(Manifest.server)

server.connection(Manifest.connection)

server.register(Manifest.plugins)
    .then(() => {
        server.start()
    })
    .then(() => {
        console.log('Server started at', server.info.uri)
    })
    .catch((err) => {
        console.error(err)
    })
