"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const v = require("../validation/validation");
const _1 = require(".");
// Currency rate subtype
exports.CURRENCY_RATE_UNIT = "xr";
exports.CURRENCY_RATE_SCALE = 6;
class CurrencyRateObject extends _1.CommodityObject {
    constructor(id, version, datasetId, code, description, currencyCode, quoteDrivers, lastPrice, lastPriceDate, lastPriceInfo) {
        super(id, version, datasetId, code, _1.CommodityType.currencyrate, description, currencyCode, exports.CURRENCY_RATE_UNIT, exports.CURRENCY_RATE_SCALE, quoteDrivers, lastPrice, lastPriceDate, lastPriceInfo);
    }
    // tslint:disable-next-line:no-any
    static make(obj) {
        if (v.isCurrencyRateObject(obj)) {
            return new CurrencyRateObject(obj.id, obj.version, obj.datasetId, obj.code, obj.description, obj.currencyCode, obj.quoteDrivers, obj.lastPrice, obj.lastPriceDate, obj.lastpriceInfo);
        }
        else {
            throw new Error("Invalid CurrencyRateObject parameters");
        }
    }
    get altSymbol() {
        return "";
    }
    isValid() {
        return v.isCurrencyRateObject(this, true);
    }
}
exports.CurrencyRateObject = CurrencyRateObject;
