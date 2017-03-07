/**
 * Enum and other utilities
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-any */
const Big = require("big.js");
function getObjectValues(e) {
    return Object.keys(e).map((k) => { return e[k]; });
}
exports.getObjectValues = getObjectValues;
function getEnumNamesAndValues(e) {
    return getEnumNames(e).map((_name) => { return { name: _name, value: e[_name] }; });
}
exports.getEnumNamesAndValues = getEnumNamesAndValues;
function getEnumNames(e) {
    return getObjectValues(e).filter((v) => { return typeof v === "string"; });
}
exports.getEnumNames = getEnumNames;
function getEnumValues(e) {
    return getObjectValues(e).filter((v) => { return typeof v === "number"; });
}
exports.getEnumValues = getEnumValues;
function makeEnumIntValue(e, opt) {
    if (typeof opt === "string") {
        return e[opt];
    }
    else {
        return e[e[opt]];
    }
}
exports.makeEnumIntValue = makeEnumIntValue;
function deepEqualObj(x, y) {
    if (x && y && typeof x === "object" && typeof y === "object") {
        return (Object.keys(x).length === Object.keys(y).length) &&
            Object.keys(x).every((key) => { return deepEqualObj(x[key], y[key]); }, true);
    }
    else {
        return (x === y);
    }
}
exports.deepEqualObj = deepEqualObj;
// Util toAmount
function toAmount(v) {
    return (v instanceof Big ? v : Big(v));
}
exports.toAmount = toAmount;
