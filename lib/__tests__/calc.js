"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var calc_1 = require("../calc");
test('returns 0 when given nothing', function () {
    expect(calc_1.sum()).toBe(0);
});
test('returns 3 when given 1 and 2 to sum', function () {
    expect(calc_1.sum(1, 2)).toEqual(3);
});
test('returns a valid bet when given a correct WIN bet input', function () {
    var bet = ['Bet', 'W', '3', '20'];
    expect(calc_1.isValidBet.apply(void 0, bet)).toBe(true);
});
test('returns a valid bet when given a correct PLACE bet input', function () {
    var bet = ['Bet', 'P', '3', '20'];
    expect(calc_1.isValidBet.apply(void 0, bet)).toBe(true);
});
test('returns a valid bet when given a correct EXACTA bet input', function () {
    var bet = ['Bet', 'E', '3', '20'];
    expect(calc_1.isValidBet.apply(void 0, bet)).toBe(true);
});
test('returns an invalid bet when given a missing bet input', function () {
    var bet = ['Bet', '3', '20'];
    expect(calc_1.isValidBet.apply(void 0, bet)).toBe(false);
});
test('returns an invalid bet when given an extra bet input', function () {
    var bet = ['Bet', 'W', '3', '5', '20'];
    expect(calc_1.isValidBet.apply(void 0, bet)).toBe(false);
});
test('returns a valid bet result when given proper input', function () {
    var result = ['Result', '1', '3', '2'];
    expect(calc_1.isValidResult.apply(void 0, result)).toBe(true);
});
test('returns an invalid bet result when given improper input', function () {
    var result = ['Value', '1', '3', '2'];
    expect(calc_1.isValidResult.apply(void 0, result)).toBe(false);
});
test('returns a bet object when given proper bet input', function () {
    var bet = ['W', '3', '20'];
    var betObj = {
        type: 'W',
        betting: '3',
        stake: 20
    };
    expect(calc_1.createBetObj.apply(void 0, bet)).toEqual(betObj);
});
