/**
 * CommodityObject
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Commodity and related hierarchy
const Big = require("big.js");
const u = require("../utils/utils");
const v = require("../validation/validation");
const _1 = require(".");
var CommodityType;
(function (CommodityType) {
    CommodityType[CommodityType["currencyrate"] = 0] = "currencyrate";
    CommodityType[CommodityType["security"] = 1] = "security";
    CommodityType[CommodityType["commodity"] = 2] = "commodity";
    CommodityType[CommodityType["home"] = 3] = "home";
    CommodityType[CommodityType["car"] = 4] = "car";
    CommodityType[CommodityType["mortgage"] = 5] = "mortgage";
    CommodityType[CommodityType["lineofcredit"] = 6] = "lineofcredit";
})(CommodityType = exports.CommodityType || (exports.CommodityType = {}));
exports.COMMODITY_TYPE_NAMES = u.getEnumNames(CommodityType);
exports.COMMODITY_TYPE_VALUES = u.getEnumValues(CommodityType);
exports.COMMODITY_TYPE_NAMES_AND_VALUES = u.getEnumNamesAndValues(CommodityType);
exports.DEFAULT_COMMODITY_UNIT = "qty";
class CommodityObject extends _1.DomainObject {
    constructor(id, version, datasetId, code, comType, description, currencyCode, unit = exports.DEFAULT_COMMODITY_UNIT, scale, quoteDrivers, lastPrice, lastPriceDate, lastPriceInfo) {
        super(id, version);
        this.datasetId = datasetId;
        this.code = code;
        this.comType = comType;
        this.description = description;
        this.currencyCode = currencyCode;
        this.unit = unit;
        this.scale = scale;
        this.quoteDrivers = quoteDrivers;
        this.lastPriceInfo = lastPriceInfo;
        this.lastPrice = (typeof lastPrice === "string" ? Big(lastPrice) : lastPrice);
        this.lastPriceDate = (typeof lastPriceDate === "number" ? new Date(lastPriceDate) : lastPriceDate);
    }
    isValid() {
        return v.isCommodityObject(this, true);
    }
}
exports.CommodityObject = CommodityObject;
