import { IBet, ITally } from './models/bets.model'

export const sum = (...args: number[]) => args.reduce((acc, val) => acc + val, 0)

export const isValidBet = (...args: any[]) => {
    if (args.length !== 4) {
       return false
    }
    const action: string = args[0]
    const betType: string = args[1] && args[1].length ? args[1] : ''
    const betting: string = args[2]
    const stake: number = args[3]
    if (action.toLowerCase() !== 'bet' || ['W', 'P', 'E'].indexOf(betType.toUpperCase()) === -1) {
        return false
    }
    return true
}

export const isValidResult = (...args: any[]) => {
    if (args.length < 1) {
       return false
    }
    const action: string = args[0]
    if (action.toLowerCase() !== 'result') {
        return false
    }
    return true
}

export const createBetObj = (...args: any[]) => {
    return {
        type: <string>args[0],
        betting: <string>args[1],
        stake: +args[2]
    }
}

export const createResultObj = (...args: string[]) => {
    return [...args]
}


