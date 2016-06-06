import _ from 'lodash'
import { betterUser } from './userService'

export function calculateRank(ranking = []) {
    return _(ranking)
        .orderBy((row) => row.stats.totalScore, 'desc')
        .transform((result, row) => {
            row.rank = getRank(result, row.stats)
            result.push(row)
        }, [])
        .orderBy([
            (rank) => rank.stats.totalScore,
            (rank) => rank.stats.nbPredictions,
            (rank) => rank.stats.nbPerfects,
        ], ['desc', 'desc', 'desc'])
        .value()

    function getRank(rows, stats) {
        if (rows.length === 0) {
            return 1
        }

        const lastRank = _.last(rows, stats)
        if (lastRank.stats.totalScore === stats.totalScore) {
            return lastRank.rank
        }

        return lastRank.rank + 1
    }
}

export function formatRanking(rank) {
    return {
        user: betterUser({
            id: rank.userId,
            name: rank.userName,
            ..._.pick(rank, 'anonymousName', 'avatarUrl', 'isAnonymous'),
        }),
        stats: {
            totalScore: rank.totalScore,
            nbPredictions: rank.nbPredictions,
            nbPerfects: rank.nbPerfects,
        },
    }
}
