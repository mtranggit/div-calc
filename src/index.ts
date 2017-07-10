import { isValidBet, isValidResult, createBetObj, createResultObj } from './helpers'
import { IBet, ITally } from './models/bets.model'
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
    getPLACEDividend,
    getProductDividend
} from './calc'

const path = require('path')
const readline = require('readline')
const fs = require('fs-extra')
const rootDir = path.resolve('.')
const rl = readline.createInterface({
    input: fs.createReadStream(rootDir + '/assets/data.txt')
    // output: process.stdout
})
const prefix = 'BET> '

// const readline = require('readline'),
//   rl = readline.createInterface(process.stdin, process.stdout),
//   prefix = 'BET> ';

const tally: ITally = {
    bet: [],
    result: undefined
}

rl.on('line', (line: string) => {
    if (line.trim().toLowerCase().indexOf('bet') !== -1) {
        const bet = line.split(':')
        // console.log('Betting', bet);
        if (isValidBet(...bet)) {
            const betObj = createBetObj(...bet.slice(1))
            tally.bet.push(betObj)
            // console.log('bet object', betObj)
        }
    } else if (line.trim().toLowerCase().indexOf('result') !== -1) {
        const result = line.split(':')
        // console.log('Received a result ', result)
        if (isValidResult(...result)) {
            const resultObj = createResultObj(...result.slice(1))
            tally.result  = resultObj
            // console.log('result obj', resultObj)
        }
    } else {
        console.log('Please enter a bet or result')
    }
    // rl.setPrompt(prefix, prefix.length);
    // rl.prompt();
}).on('close', function() {
    betProductDividend(tally);
    process.exit(0);
});
// console.log(prefix + 'Good to see you. Enter bet or result.');
// rl.setPrompt(prefix, prefix.length);
// rl.prompt();

const betProductDividend = (bettingTally: ITally) => {
    // console.log('Betting tally...', bettingTally)
    const bets = bettingTally.bet
    const result = bettingTally.result ? bettingTally.result : []
    const betSums = productBetSums(...bets)
    const adjustedSums = getAdjustedBetSums(betSums, getCommissionRates())
    const winBets = getWINBet(result[0], ...bets)
    const winBetDiv = getProductDividend(adjustedSums.W, ...winBets)
    const placeBets = getPLACEBet(result, ...bets)
    const placeBetSums = getPLACEBetSums(...placeBets)
    const placeBetDiv: any = getPLACEDividend(adjustedSums.P, placeBetSums)
    const exactaBetting = result.slice(0, 2).join()
    const exactaBets = getEXACTABet(exactaBetting, ...bets)
    const exactaBetDiv = getProductDividend(adjustedSums.E, ...exactaBets)

    console.log(`W:${result[0]}:$${winBetDiv.toFixed(2)}      #Win bet on horse ${result[0]} yields $${winBetDiv.toFixed(2)}`);
    console.log(`P:${result[0]}:$${placeBetDiv[result[0]].toFixed(2)}      #Win bet on horse ${result[0]} yields $${placeBetDiv[result[0]].toFixed(2)}`)
    console.log(`P:${result[1]}:$${placeBetDiv[result[1]].toFixed(2)}      #Win bet on horse ${result[1]} yields $${placeBetDiv[result[1]].toFixed(2)}`)
    console.log(`P:${result[2]}:$${placeBetDiv[result[2]].toFixed(2)}      #Win bet on horse ${result[2]} yields $${placeBetDiv[result[2]].toFixed(2)}`)
    console.log(`E:${exactaBetting}:${exactaBetDiv.toFixed(2)}     #Win bet on horse ${exactaBetting} yields $${exactaBetDiv.toFixed(2)}`)
}


