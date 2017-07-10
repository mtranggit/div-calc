"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sum = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.reduce(function (acc, val) { return acc + val; }, 0);
};
exports.isValidBet = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length !== 4) {
        return false;
    }
    var action = args[0];
    var betType = args[1] && args[1].length ? args[1] : '';
    var betting = args[2];
    var stake = args[3];
    if (action.toLowerCase() !== 'bet' || ['W', 'P', 'E'].indexOf(betType.toUpperCase()) === -1) {
        return false;
    }
    return true;
};
exports.isValidResult = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (args.length < 1) {
        return false;
    }
    var action = args[0];
    if (action.toLowerCase() !== 'result') {
        return false;
    }
    return true;
};
exports.createBetObj = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return {
        type: args[0],
        betting: args[1],
        stake: +args[2]
    };
};
exports.createResultObj = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.slice();
};
