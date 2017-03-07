/**
 * CurrencyObject
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const v = require("../validation/validation");
const _1 = require(".");
class CurrencyObject extends _1.ValidatedObject {
    constructor(code, iso, description, scale) {
        super();
        this.code = code;
        this.iso = iso;
        this.description = description;
        this.scale = scale;
    }
    // tslint:disable-next-line:no-any
    static make(obj) {
        if (v.isCurrencyObject(obj)) {
            return new CurrencyObject(obj.code, obj.iso, obj.description, obj.scale);
        }
        else {
            throw new Error("Invalid CurrencyObject parameters");
        }
    }
    isValid() {
        return v.isCurrencyObject(this);
    }
}
exports.CurrencyObject = CurrencyObject;
