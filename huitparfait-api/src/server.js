import { Server } from 'hapi'
import Manifest from './manifest'
import { CronJob } from 'cron'
import { calculatePronostic } from './services/pronosticService'
import { recalculateRanking } from './services/rankingService'

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


recalculateRanking()

new CronJob('8 8 8 * * *', function () {
    calculatePronostic().then(() => {
        return recalculateRanking()
    })

}, null, true, 'Europe/Paris')
