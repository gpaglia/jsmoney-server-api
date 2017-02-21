/**
 * Validation helpers routines
 */
"use strict";
// import * as bigjs from "big.js";
// import BigJS = BigJsLibrary.BigJS;
/* tslint:disable:no-any*/
const api_objects_1 = require("./api.objects");
const util = require("./utils");
const val = require("validator");
exports.USERNAME_MIN_LEN = 4;
exports.PASSWORD_MIN_LEN = 8;
exports.MAX_NAME_LEN = 32;
exports.MAX_CURRENCY_SCALE = 5;
exports.MAX_COMMODITY_SCALE = 5;
function isNull(obj) {
    return obj == null;
}
exports.isNull = isNull;
function isDefined(obj) {
    return (obj != null);
}
exports.isDefined = isDefined;
function isOfType(obj, typ) {
    return isDefined(obj) && (typeof obj === typ);
}
exports.isOfType = isOfType;
function isOfTypeOrNull(obj, typ) {
    return isNull(obj) || (typeof obj === typ);
}
exports.isOfTypeOrNull = isOfTypeOrNull;
function isInstanceOf(obj, clazz) {
    return isDefined(obj) && obj instanceof clazz;
}
exports.isInstanceOf = isInstanceOf;
function isArray(obj) {
    return isDefined(obj) && obj instanceof Array;
}
exports.isArray = isArray;
function isArrayDeep(obj, fn) {
    if (isArray(obj)) {
        if (fn == null) {
            return true;
        }
        for (let x of obj) {
            if (!fn(x)) {
                return false;
            }
        }
        return true;
    }
    else {
        return false;
    }
}
exports.isArrayDeep = isArrayDeep;
function isStringLen(obj, min, max) {
    return isOfType(obj, "string")
        && val.isLength(obj, { min, max });
}
exports.isStringLen = isStringLen;
function isInt(obj) {
    return isOfType(obj, "number") && Number.isInteger(obj);
}
exports.isInt = isInt;
function isIntRange(obj, min, max) {
    return (isOfType(obj, "number")
        && obj >= min
        && obj <= max
        && Number.isInteger(obj));
}
exports.isIntRange = isIntRange;
function isStringInSet(obj, strings) {
    return isOfType(obj, "string") && strings.indexOf(obj) >= 0;
}
exports.isStringInSet = isStringInSet;
function isNumberInSet(obj, numbers) {
    return isOfType(obj, "number") && numbers.indexOf(obj) >= 0;
}
exports.isNumberInSet = isNumberInSet;
function isIntInSet(obj, numbers) {
    return isInt(obj) && numbers.indexOf(obj) >= 0;
}
exports.isIntInSet = isIntInSet;
function isEnumType(obj, e) {
    return (isOfType(obj, "number")
        && util.getEnumNamesAndValues(e).map((nvp) => { return nvp.value; }).indexOf(obj) >= 0)
        || (isOfType(obj, "string")
            && util.getEnumNamesAndValues(e).map((nvp) => { return nvp.name; }).indexOf(obj) >= 0);
}
exports.isEnumType = isEnumType;
function isEnumKey(obj, e) {
    return isOfType(obj, "string")
        && util.getEnumNames(e).indexOf(obj) >= 0;
}
exports.isEnumKey = isEnumKey;
function isEnumValue(obj, e) {
    return isInt(obj)
        && util.getEnumValues(e).indexOf(obj) >= 0;
}
exports.isEnumValue = isEnumValue;
// Field Validation
function isId(obj) {
    return val.isUUID(obj, 4);
}
exports.isId = isId;
function isUsername(obj) {
    return isStringLen(obj, exports.USERNAME_MIN_LEN, undefined);
}
exports.isUsername = isUsername;
function isPassword(obj) {
    return isStringLen(obj, exports.PASSWORD_MIN_LEN, undefined);
}
exports.isPassword = isPassword;
function isName(obj) {
    return isStringLen(obj.name, 1, exports.MAX_NAME_LEN);
}
exports.isName = isName;
function isCurrencyCode(obj) {
    return isOfType(obj, "string") && /[A-Z][A-Z][A-Z]/.test(obj);
}
exports.isCurrencyCode = isCurrencyCode;
function isCurrencyIso(obj) {
    return isOfType(obj, "string") && /[0-9][0-9][0-9]/.test(obj);
}
exports.isCurrencyIso = isCurrencyIso;
function isCurrencyScale(obj) {
    return isIntRange(obj.scale, 0, exports.MAX_CURRENCY_SCALE);
}
exports.isCurrencyScale = isCurrencyScale;
function isCommodityScale(obj) {
    return isIntRange(obj.scale, 0, exports.MAX_COMMODITY_SCALE);
}
exports.isCommodityScale = isCommodityScale;
function isCurrencyCodeList(obj) {
    return isArrayDeep(obj, isCurrencyCode);
}
exports.isCurrencyCodeList = isCurrencyCodeList;
function isRole(obj) {
    return isEnumType(obj, api_objects_1.Role);
}
exports.isRole = isRole;
function isCommodityType(obj) {
    return isEnumType(obj, api_objects_1.CommodityType);
}
exports.isCommodityType = isCommodityType;
function isSecurityType(obj) {
    return isEnumType(obj, api_objects_1.SecurityType);
}
exports.isSecurityType = isSecurityType;
function isAccountType(obj) {
    return isEnumType(obj, api_objects_1.AccountType);
}
exports.isAccountType = isAccountType;
function isAmount(obj) {
    return (isOfType(obj, "string") && val.isDecimal(obj)) || isInstanceOf(obj, Big);
}
exports.isAmount = isAmount;
// Object Validation
function isVersionedObject(obj) {
    return (obj.id == null || isId(obj.id)) && (obj.version == null || obj.version >= 0);
}
exports.isVersionedObject = isVersionedObject;
function isCredentialsObject(obj) {
    return isUsername(obj.username) && isPassword(obj.password);
}
exports.isCredentialsObject = isCredentialsObject;
function isCurrencyObject(obj) {
    return isCurrencyCode(obj.code)
        && isCurrencyIso(obj.iso)
        && isCurrencyScale(obj.scale);
}
exports.isCurrencyObject = isCurrencyObject;
function isCommodityObject(obj) {
    return isVersionedObject(obj)
        && isOfType(obj.code, "string")
        && isCommodityType(obj.comType)
        && isCurrencyCode(obj.currencyCode)
        && isOfType(obj.unit, "string")
        && isCommodityScale(obj.scale);
}
exports.isCommodityObject = isCommodityObject;
function isSecurityObject(obj) {
    return isVersionedObject(obj)
        && isCommodityObject(obj)
        && (util.makeEnumIntValue(api_objects_1.CommodityType, obj.comType) === api_objects_1.CommodityType.security)
        && isSecurityType(obj.secType)
        && isOfTypeOrNull(obj.altSymbol, "string")
        && isArray(obj.quoteDrivers)
        && (isInstanceOf(obj.lastPrice, Big) || isOfType(obj.lastPrice, "string"));
}
exports.isSecurityObject = isSecurityObject;
function isUserObject(obj) {
    return isVersionedObject(obj)
        && isUsername(obj.username)
        && isDefined(obj.firstName)
        && isDefined(obj.lastName)
        && val.isEmail(obj.email)
        && isRole(obj.role);
}
exports.isUserObject = isUserObject;
function isAuthenticateData(obj) {
    return isUserObject(obj.user) && isOfType(obj.token, "string");
}
exports.isAuthenticateData = isAuthenticateData;
function isDatasetObject(obj) {
    return isVersionedObject(obj)
        && isName(obj.name)
        && isCurrencyCode(obj.currencyCode)
        && isCurrencyCodeList(obj.additionalCurrencies);
}
exports.isDatasetObject = isDatasetObject;
function isAccountObject(obj) {
    return isVersionedObject(obj)
        && isName(obj.name)
        && isAccountType(obj.accType)
        && isCurrencyCode(obj.currencyCode)
        && isCurrencyScale(obj.scale)
        && isAmount(obj.qty);
}
exports.isAccountObject = isAccountObject;
