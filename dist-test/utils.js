/**
 * Enum and other utilities
 */
"use strict";
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
