"use strict";
// const path = require('path')
// const readline = require('readline')
// const fs = require('fs-extra')
// const rootDir = path.resolve('.')
// const myInterface = readline.createInterface({
//     input: fs.createReadStream(rootDir + '/assets/data.txt')
// })
Object.defineProperty(exports, "__esModule", { value: true });
// let lineno = 0;
// let betArray = []
// myInterface.on('line', (line: string) => {
//     lineno++;
//     const bet = line.split(':')
//     // console.log(`Line number ${lineno}: ${line}`)
//     console.log(bet);
// })
var calc_1 = require("./calc");
var readline = require('readline'), rl = readline.createInterface(process.stdin, process.stdout), prefix = 'BET> ';
rl.on('line', function (line) {
    if (line.trim().toLowerCase().indexOf('bet') !== -1) {
        var bet = line.split(':');
        console.log('Betting', bet);
        if (calc_1.isValidBet.apply(void 0, bet)) {
            return calc_1.createBetObj.apply(void 0, bet.slice(1));
        }
    }
    else if (line.trim().toLowerCase().indexOf('result') !== -1) {
        var result = line.split(':');
        console.log('Received a result ', result);
        if (calc_1.isValidResult.apply(void 0, bet)) {
            return createResultObj.apply(void 0, result.slice(1));
        }
    }
    else {
        console.log('Please enter a bet or result');
    }
    rl.setPrompt(prefix, prefix.length);
    rl.prompt();
}).on('close', function () {
    console.log('Have a great day!');
    process.exit(0);
});
console.log(prefix + 'Good to see you. Enter bet or result.');
rl.setPrompt(prefix, prefix.length);
rl.prompt();
