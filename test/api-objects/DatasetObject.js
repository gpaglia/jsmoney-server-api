/**
 * DatasetObject
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const v = require("../validation/validation");
const _1 = require(".");
// Dataset type
class DatasetObject extends _1.DomainObject {
    constructor(id, version, userId, name, description, currencyCode, additionalCurrencyCodes) {
        super(id, version);
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.currencyCode = currencyCode;
        this.additionalCurrencyCodes = additionalCurrencyCodes;
    }
    // tslint:disable-next-line:no-any
    static make(obj) {
        if (v.isDatasetObject(obj)) {
            return new DatasetObject(obj.id, obj.version, obj.userId, obj.name, obj.description, obj.currencyCode, obj.additionalCurrencyCodes);
        }
        else {
            throw new Error("Invalid datasetObject parameters");
        }
    }
    isValid() {
        return v.isDatasetObject(this, true);
    }
}
exports.DatasetObject = DatasetObject;
