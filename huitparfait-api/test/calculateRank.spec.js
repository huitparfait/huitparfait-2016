import expect from 'expect'
import { calculateRank } from '../src/services/rankingService'

describe('Calculate Rank', () => {

    it('should rank simple', () => {
        const ranking = [
            { stats: { totalScore: 3 } },
            { stats: { totalScore: 2 } },
            { stats: { totalScore: 1 } },
        ]

        expect(calculateRank(ranking)).toEqual([
            { rank: 1, stats: { totalScore: 3 } },
            { rank: 2, stats: { totalScore: 2 } },
            { rank: 3, stats: { totalScore: 1 } },
        ])
    })

    it('should rank complex', () => {
        const ranking = [
            { stats: { totalScore: 3 } },
            { stats: { totalScore: 3 } },
            { stats: { totalScore: 1 } },
        ]

        expect(calculateRank(ranking)).toEqual([
            { rank: 1, stats: { totalScore: 3 } },
            { rank: 1, stats: { totalScore: 3 } },
            { rank: 3, stats: { totalScore: 1 } },
        ])
    })

})
