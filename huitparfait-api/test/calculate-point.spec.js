import expect from 'expect'
import { calculateClassicPoints, calculateRiskPoints }  from './calculate-classic-points'

describe('Calculator Points', () => {

    describe('Calculate Classic Points', () => {

        it('should good issue (Team A win) and goals found', () => {
            const pronostic = { goalsTeamA: 2, goalsTeamB: 1 }
            const game = { goalsTeamA: 2, goalsTeamB: 1 }

            expect(calculateClassicPoints(pronostic, game)).toBe(5)
        })

        it('should good issue (Team B win) and goals found', () => {
            const pronostic = { goalsTeamA: 1, goalsTeamB: 2 }
            const game = { goalsTeamA: 1, goalsTeamB: 2 }

            expect(calculateClassicPoints(pronostic, game)).toBe(5)
        })

        it('should good issue (Draw) with goals found', () => {
            const pronostic = { goalsTeamA: 1, goalsTeamB: 1 }
            const game = { goalsTeamA: 1, goalsTeamB: 1 }

            expect(calculateClassicPoints(pronostic, game)).toBe(5)
        })

        it('should good issue (Draw) but wrong goals', () => {
            const pronostic = { goalsTeamA: 2, goalsTeamB: 2 }
            const game = { goalsTeamA: 1, goalsTeamB: 1 }

            expect(calculateClassicPoints(pronostic, game)).toBe(3)
        })

        it('should good issue (Team A) but wrong goals', () => {
            const pronostic = { goalsTeamA: 2, goalsTeamB: 1 }
            const game = { goalsTeamA: 3, goalsTeamB: 0 }

            expect(calculateClassicPoints(pronostic, game)).toBe(3)
        })

        it('should wrong issue but Team A goals found', () => {
            const pronostic = { goalsTeamA: 1, goalsTeamB: 0 }
            const game = { goalsTeamA: 1, goalsTeamB: 1 }

            expect(calculateClassicPoints(pronostic, game)).toBe(1)
        })

        it('should wrong issue but Team B goals found', () => {
            const pronostic = { goalsTeamA: 1, goalsTeamB: 0 }
            const game = { goalsTeamA: 0, goalsTeamB: 0 }

            expect(calculateClassicPoints(pronostic, game)).toBe(1)
        })
    })

    describe('Calculate Risk Points', () => {

        it('should risk win +3 point', () => {
            const predictRisk = { willHappen: true, amount: 3, happened: true }

            expect(calculateRiskPoints(predictRisk)).toBe(3)
        })

        it('should risk no play', () => {
            const predictRisk = { willHappen: false, amount: 0, happened: true }

            expect(calculateRiskPoints(predictRisk)).toBe(0)
        })

        it('should risk lost -3', () => {
            const predictRisk = { willHappen: true, amount: 3, happened: false }

            expect(calculateRiskPoints(predictRisk)).toBe(-3)
        })
    })


})
