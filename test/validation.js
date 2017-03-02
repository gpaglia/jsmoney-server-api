/**
 * Validation helpers routines
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Big = require("big.js");
/* tslint:disable:no-any*/
const api_objects_1 = require("./api.objects");
const util = require("./utils");
const val = require("validator");
exports.USERNAME_MIN_LEN = 4;
exports.USERNAME_MAX_LEN = 12;
exports.PASSWORD_MIN_LEN = 8;
exports.PASSWORD_MAX_LEN = 12;
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
        for (const x of obj) {
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
        && (max == null || obj <= max)
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
    return isOfType(obj, "string") && val.isUUID(obj, 4);
}
exports.isId = isId;
function isVersion(obj) {
    return isIntRange(obj, 0);
}
exports.isVersion = isVersion;
function isUsername(obj) {
    return isStringLen(obj, exports.USERNAME_MIN_LEN, exports.USERNAME_MAX_LEN)
        && /^[a-zA_Z][a-zA-Z0-9_]*$/.test(obj);
}
exports.isUsername = isUsername;
function isPassword(obj) {
    return isStringLen(obj, exports.PASSWORD_MIN_LEN, exports.PASSWORD_MAX_LEN);
}
exports.isPassword = isPassword;
function isName(obj) {
    return isStringLen(obj, 1, exports.MAX_NAME_LEN);
}
exports.isName = isName;
function isCurrencyCode(obj) {
    return isOfType(obj, "string") && /^[A-Z][A-Z][A-Z]$/.test(obj);
}
exports.isCurrencyCode = isCurrencyCode;
function isCurrencyIso(obj) {
    return isOfType(obj, "string") && /^[0-9][0-9][0-9]$/.test(obj);
}
exports.isCurrencyIso = isCurrencyIso;
function isCurrencyScale(obj) {
    return isIntRange(obj, 0, exports.MAX_CURRENCY_SCALE);
}
exports.isCurrencyScale = isCurrencyScale;
function isCommodityScale(obj) {
    return isIntRange(obj, 0, exports.MAX_COMMODITY_SCALE);
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
function isDateProp(obj) {
    return isInstanceOf(obj, Date) || isIntRange(obj, 0);
}
exports.isDateProp = isDateProp;
// Object Validation
function isObjectReference(obj) {
    return isDefined(obj) && isId(obj.id) && isVersion(obj.version);
}
exports.isObjectReference = isObjectReference;
function isDomainObject(obj, explicit = false) {
    return (isDefined(obj)) && ((obj.id == null && !explicit) || isId(obj.id)) && ((obj.version == null && !explicit) || obj.version >= 0);
}
exports.isDomainObject = isDomainObject;
function isCredentialsObject(obj) {
    return isUsername(obj.username) && isPassword(obj.password);
}
exports.isCredentialsObject = isCredentialsObject;
function isCurrencyObject(obj) {
    return isCurrencyCode(obj.code)
        && isCurrencyIso(obj.iso)
        && isCurrencyScale(obj.scale)
        && isOfType(obj.description, "string");
}
exports.isCurrencyObject = isCurrencyObject;
function isCommodityObject(obj, explicit = false) {
    return isDomainObject(obj, explicit)
        && isOfType(obj.code, "string")
        && (!explicit && !isDefined(obj.comType) || isCommodityType(obj.comType))
        && (!isDefined(obj.dataset) || isId(obj.dataset) || isDatasetObject(obj.dataset))
        && isCurrencyCode(obj.currencyCode)
        && isOfTypeOrNull(obj.unit, "string")
        && isCommodityScale(obj.scale)
        && isOfType(obj.description, "string")
        && (isNull(obj.quoteDriver) || isArrayDeep(obj.quoteDrivers, (x) => { return isOfType(x, "string"); }))
        && (!isDefined(obj.lastPrice) || isInstanceOf(obj.lastPrice, Big) || isAmount(obj.lastPrice))
        && ((isDefined(obj.lastPrice) && isDateProp(obj.lastPriceDate)) || !isDefined(obj.lastPrice && !isDefined(obj.lastPriceDate)))
        && ((isDefined(obj.lastPrice) && isOfTypeOrNull(obj.lastPriceInfo, "string")) || !isDefined(obj.lastPrice) && !isDefined(obj.lastPriceInfo));
}
exports.isCommodityObject = isCommodityObject;
function isCurrencyRateObject(obj, explicit = false) {
    return isCommodityObject(obj, explicit)
        && (!explicit && !isDefined(obj.comType) || util.makeEnumIntValue(api_objects_1.CommodityType, obj.comType) === api_objects_1.CommodityType.currencyrate)
        && isCurrencyCode(obj.code)
        && isCurrencyCode(obj.currencyCode)
        && !isDefined(obj.dataset);
}
exports.isCurrencyRateObject = isCurrencyRateObject;
function isSecurityObject(obj, explicit = false) {
    return isCommodityObject(obj, explicit)
        && (!explicit && !isDefined(obj.comType) || util.makeEnumIntValue(api_objects_1.CommodityType, obj.comType) === api_objects_1.CommodityType.security)
        && isSecurityType(obj.secType)
        && isOfTypeOrNull(obj.altSymbol, "string");
}
exports.isSecurityObject = isSecurityObject;
function isUserObject(obj, explicit = false) {
    return isDomainObject(obj, explicit)
        && isUsername(obj.username)
        && isDefined(obj.firstName)
        && isDefined(obj.lastName)
        && isOfType(obj.email, "string") && val.isEmail(obj.email)
        && isRole(obj.role);
}
exports.isUserObject = isUserObject;
function isUserAndPasswordObject(obj) {
    return isUserObject(obj.user, true) && isPassword(obj.password);
}
exports.isUserAndPasswordObject = isUserAndPasswordObject;
function isAuthenticateDataObject(obj) {
    return isUserObject(obj.user, true) && isOfType(obj.token, "string");
}
exports.isAuthenticateDataObject = isAuthenticateDataObject;
function isDatasetObject(obj, explicit = true) {
    return isDomainObject(obj, explicit)
        && isName(obj.name)
        && (isId(obj.user) || isUserObject(obj.user))
        && isCurrencyCode(obj.currencyCode)
        && isCurrencyCodeList(obj.additionalCurrencyCodes);
}
exports.isDatasetObject = isDatasetObject;
function isAccountObject(obj, explicit = true) {
    return isDomainObject(obj, explicit)
        && isName(obj.name)
        && isAccountType(obj.accType)
        && isCurrencyCode(obj.currencyCode)
        && isCurrencyScale(obj.scale)
        && isAmount(obj.qty);
}
exports.isAccountObject = isAccountObject;
