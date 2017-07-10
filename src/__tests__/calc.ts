import { sum, isValidBet, isValidResult, createBetObj } from '../helpers';
import {
    productBetSums,
    getCommissionRates,
    getAdjustedBetSums,
    getWINBet,
    getPLACEBet,
    getPLACEBetSums,
    getEXACTABet,
    getWINBetDividend,
    getPLACEBetDividend,
    getProductDividend
} from '../calc'

test('returns 0 when given nothing', () => {
    expect(sum()).toBe(0);
})

test('returns 3 when given 1 and 2 to sum', () => {
    expect(sum(1, 2)).toEqual(3);
})

test('returns a valid bet when given a correct WIN bet input', () => {
    const bet = ['Bet', 'W', '3', '20']
    expect(isValidBet(...bet)).toBe(true)
})

test('returns a valid bet when given a correct PLACE bet input', () => {
    const bet = ['Bet', 'P', '3', '20']
    expect(isValidBet(...bet)).toBe(true)
})
test('returns a valid bet when given a correct EXACTA bet input', () => {
    const bet = ['Bet', 'E', '3', '20']
    expect(isValidBet(...bet)).toBe(true)
})

test('returns an invalid bet when given a missing bet input', () => {
    const bet = ['Bet', '3', '20']
    expect(isValidBet(...bet)).toBe(false)
})

test('returns an invalid bet when given an extra bet input', () => {
    const bet = ['Bet', 'W', '3', '5', '20']
    expect(isValidBet(...bet)).toBe(false)
})

test('returns a valid bet result when given proper input', () => {
    const result = ['Result', '1', '3', '2']
    expect(isValidResult(...result)).toBe(true)
})

test('returns an invalid bet result when given improper input', () => {
    const result = ['Value', '1', '3', '2']
    expect(isValidResult(...result)).toBe(false)
})

test('returns a bet object when given proper bet input', () => {
    const bet = ['W', '3', '20']
    const betObj = {
        type: 'W',
        betting: '3',
        stake: 20
    }
    expect(createBetObj(...bet)).toEqual(betObj)
})

test('returns a sum of each bet products when given proper bet inputs', () => {
    const bets = [
        { type: 'W', betting: '1', stake: 3 },
        { type: 'W', betting: '2', stake: 4 },
        { type: 'P', betting: '1', stake: 4 },
        { type: 'P', betting: '2', stake: 5 },
        { type: 'P', betting: '3', stake: 6 },
        { type: 'E', betting: '1,2', stake: 5 },
        { type: 'E', betting: '2,3', stake: 6 },
        { type: 'E', betting: '1,3', stake: 7 }]
    const productSums = {'W': 7, 'P': 15, 'E': 18}
    // console.log(productBetSums(...bets))
    expect(productBetSums(...bets)).toEqual(productSums)
})

test('returns an adjusted sum of each bet products when applied an commission rate object', () => {
    const productSums = { W: 100, P: 100, E: 100 }
    const adjustedSums = {W: 85, P: 88, E: 82}
    const commissionRates = getCommissionRates()
    expect(getAdjustedBetSums(productSums, commissionRates)).toEqual(adjustedSums)
})

test('returns a WIN bets when given proper bet inputs', () => {
    const bets = [
        { type: 'W', betting: '1', stake: 3 },
        { type: 'W', betting: '2', stake: 4 },
        { type: 'W', betting: '3', stake: 5 },
        { type: 'W', betting: '2', stake: 6 },
        { type: 'P', betting: '1', stake: 4 },
        { type: 'P', betting: '2', stake: 5 },
        { type: 'P', betting: '3', stake: 6 },
        { type: 'E', betting: '1,2', stake: 5 },
        { type: 'E', betting: '2,3', stake: 6 },
        { type: 'E', betting: '1,3', stake: 7 }]
    const winBets = [4, 6 ]
    const winner = '2'
    expect(getWINBet(winner, ...bets)).toEqual(winBets)
})

test('returns a WIN dividen when given a proper win bets', () => {
    const winBets = [1, 2, 3, 4]
    const totalPool = 100
    expect(getProductDividend(totalPool, ...winBets)).toEqual(10)
    // expect(getWINBetDividend(totalPool, ...winBets)).toEqual(10)
})

test('returns a PLACE bets when given proper bet inputs', () => {
    const bets = [
        { type: 'W', betting: '1', stake: 3 },
        { type: 'W', betting: '2', stake: 4 },
        { type: 'W', betting: '3', stake: 5 },
        { type: 'W', betting: '2', stake: 6 },
        { type: 'P', betting: '1', stake: 4 },
        { type: 'P', betting: '2', stake: 5 },
        { type: 'P', betting: '6', stake: 5 },
        { type: 'P', betting: '3', stake: 6 },
        { type: 'E', betting: '1,2', stake: 5 },
        { type: 'E', betting: '2,3', stake: 6 },
        { type: 'E', betting: '1,3', stake: 7 }]
    const placeBets = [
        { type: 'P', betting: '1', stake: 4 },
        { type: 'P', betting: '2', stake: 5 },
        { type: 'P', betting: '3', stake: 6 },
    ]
    const winners = ['2', '3', '1']
    expect(getPLACEBet(winners, ...bets)).toEqual(placeBets)
})

test('returns a sum of each PLACE bet when given proper PLACE bets input', () => {
    const placeBets = [
        { type: 'P', betting: '1', stake: 4 },
        { type: 'P', betting: '1', stake: 7 },
        { type: 'P', betting: '2', stake: 5 },
        { type: 'P', betting: '3', stake: 6 },
        { type: 'P', betting: '3', stake: 8 }
    ]
    const placeBetSums = { '1': 11, '2': 5, '3': 14 }
    expect(getPLACEBetSums(...placeBets)).toEqual(placeBetSums)
})

test('returns a PLACE bet dividend when given a proper place bets', () => {
    const placeBets = [2, 10, 5]
    const placeBetsDiv = [5, 1, 2]
    const totalPool = 30
    expect(getPLACEBetDividend(totalPool, ...placeBets)).toEqual(placeBetsDiv)
})

test('returns a EXACTA bets when given proper bet inputs', () => {
    const bets = [
        { type: 'W', betting: '1', stake: 3 },
        { type: 'W', betting: '2', stake: 4 },
        { type: 'W', betting: '3', stake: 5 },
        { type: 'W', betting: '2', stake: 6 },
        { type: 'P', betting: '1', stake: 4 },
        { type: 'P', betting: '2', stake: 5 },
        { type: 'P', betting: '3', stake: 6 },
        { type: 'E', betting: '1,2', stake: 5 },
        { type: 'E', betting: '2,3', stake: 6 },
        { type: 'E', betting: '2,3', stake: 7 },
        { type: 'E', betting: '2,3', stake: 8 },
        { type: 'E', betting: '1,3', stake: 7 }]
    const exactaBets = [6, 7, 8]
    const winners = '2,3'
    expect(getEXACTABet(winners, ...bets)).toEqual(exactaBets)
})

test('returns a EXACTA dividen when given a proper exacta bets', () => {
    const winBets = [1, 2, 3, 4]
    const totalPool = 100
    expect(getProductDividend(totalPool, ...winBets)).toEqual(10)
})
