import { IBet, ITally } from './models/bets.model'

export const productBetSums = (...args: IBet[]) => {
    return args.reduce((acc: any, bet: IBet) => {
        if (!acc[bet.type]) {
            acc[bet.type] = 0
        }
        acc[bet.type] += bet.stake
        return acc
    }, {})
}

export const getCommissionRates = () => ({ W: 0.15, P: 0.12, E: 0.18 })

export const getAdjustedBetSums = (productSums: any, adjustedRate: any) => {
    return {
        W: productSums.W * (1 - adjustedRate.W),
        P: productSums.P * (1 - adjustedRate.P),
        E: productSums.E * (1 - adjustedRate.E)
    }
}

export const getWINBet = (winner: string, ...bets: IBet[]) =>
        bets.filter( bet => bet.type === 'W' && bet.betting === winner)
        .map(bet => bet.stake)

export const getWINBetDividend = (totalPool: number, ...bets: any[]) => {
    return bets.reduce((acc: any, val: number, index: number, array: any) => {
        const temp = acc + val
        if (index === array.length - 1) {
        return totalPool / temp
        }
        return temp
    }, 0)
}

export const getPLACEBet = (winners: string[], ...bets: IBet[]) =>
        bets.filter( bet => bet.type === 'P' && bet.betting.length === 1 && winners.indexOf(bet.betting) !== -1)

export const getPLACEBetSums = (...args: IBet[]) => args.reduce((acc: any, bet: IBet) => {
    if (!acc[bet.betting]) {
        acc[bet.betting] = 0
    }
    acc[bet.betting] += bet.stake
    return acc
}, {})

export const getPLACEBetDividend = (totalPool: number, ...bets: number[]) => {
    return bets.map( val => totalPool / (3 * val))
}

export const getPLACEDividend = (totalPool: number, betSum: any) => {
    return {
        '1': totalPool / (3 * betSum['1']),
        '2': totalPool / (3 * betSum['2']),
        '3': totalPool / (3 * betSum['3'])
    }
}

export const getEXACTABet = (winner: string, ...bets: IBet[]) =>
        bets.filter( bet => bet.type === 'E' && bet.betting === winner)
        .map(bet => bet.stake)


export const getProductDividend = (totalPool: number, ...bets: any[]) => {
    return bets.reduce((acc: any, val: number, index: number, array: any) => {
        const temp = acc + val
        if (index === array.length - 1) {
        return totalPool / temp
        }
        return temp
    }, 0)
}
