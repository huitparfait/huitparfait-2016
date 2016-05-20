import { Server } from 'hapi'
import Manifest from './manifest'

const server = new Server(Manifest.server)

server.connection(Manifest.connection)

server.register(Manifest.plugins, function (composeErr) {
  if (composeErr) {
    return console.error(composeErr)
  }

  server.start((startErr) => {
    if (startErr) {
      return console.error(startErr)
    }

    console.log('Server started at', server.info.uri)
  })
})
