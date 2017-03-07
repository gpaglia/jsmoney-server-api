"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * SecurityObject
 */
const Big = require("big.js");
const u = require("../utils/utils");
const v = require("../validation/validation");
const _1 = require(".");
// Security subtype
var SecurityType;
(function (SecurityType) {
    SecurityType[SecurityType["bond"] = 0] = "bond";
    SecurityType[SecurityType["stock"] = 1] = "stock";
    SecurityType[SecurityType["fund"] = 2] = "fund";
})(SecurityType = exports.SecurityType || (exports.SecurityType = {}));
exports.SECURITY_TYPE_NAMES = u.getEnumNames(SecurityType);
exports.SECURITY_TYPE_VALUES = u.getEnumValues(SecurityType);
exports.SECURITY_TYPE_NAMES_AND_VALUES = u.getEnumNamesAndValues(SecurityType);
class SecurityObject extends _1.CommodityObject {
    constructor(id, version, datasetId, code, description, currencyCode, scale, secType, altSymbol, quoteDrivers, lastPrice, lastPriceDate, lastPriceInfo) {
        super(id, version, datasetId, code, _1.CommodityType.security, description, currencyCode, _1.DEFAULT_COMMODITY_UNIT, scale, quoteDrivers, lastPrice, lastPriceDate, lastPriceInfo);
        this.secType = secType;
        this.altSymbol = altSymbol;
    }
    // tslint:disable-next-line:no-any
    static make(obj) {
        if (v.isSecurityObject(obj)) {
            return new SecurityObject(obj.id, obj.version, obj.datasetId, obj.code, obj.description, obj.currencyCode, obj.scale, u.makeEnumIntValue(SecurityType, obj.secType), obj.altSymbol, obj.quoteDrivers, obj.lastPrice, obj.lastPriceDate, obj.lastPriceInfo);
        }
        else {
            throw new Error("Invalid SecurityObject parameters");
        }
    }
    get lastPriceStr() {
        return this.lastPrice.toString();
    }
    set lastPriceStr(value) {
        this.lastPrice = Big(value);
    }
    isValid() {
        return v.isSecurityObject(this, true);
    }
}
exports.SecurityObject = SecurityObject;
