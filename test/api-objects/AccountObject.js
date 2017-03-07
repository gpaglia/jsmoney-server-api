/**
 * AccountObject
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const u = require("../utils/utils");
const v = require("../validation/validation");
const _1 = require(".");
// Account type
var AccountType;
(function (AccountType) {
    AccountType[AccountType["cash"] = 0] = "cash";
    AccountType[AccountType["investment"] = 1] = "investment";
    AccountType[AccountType["cost"] = 2] = "cost";
    AccountType[AccountType["revenue"] = 3] = "revenue";
    AccountType[AccountType["asset"] = 4] = "asset";
    AccountType[AccountType["liability"] = 5] = "liability";
    AccountType[AccountType["other"] = 6] = "other";
})(AccountType = exports.AccountType || (exports.AccountType = {}));
exports.ACCOUNT_TYPE_NAMES = u.getEnumNames(AccountType);
exports.ACCOUNT_TYPE_VALUES = u.getEnumValues(AccountType);
exports.ACCOUNT_TYPE_NAMES_AND_VALUES = u.getEnumNamesAndValues(AccountType);
// Account
class AccountObject extends _1.DomainObject {
    constructor(id, version, name, accType, description, currencyCode, qty, scale) {
        super(id, version);
        this.name = name;
        this.accType = accType;
        this.description = description;
        this.currencyCode = currencyCode;
        this.scale = scale;
        this.qty = u.toAmount(qty);
    }
    // tslint:disable-next-line:no-any
    static make(obj) {
        if (v.isAccountObject(obj)) {
            return new AccountObject(obj.id, obj.version, obj.name, u.makeEnumIntValue(AccountType, obj.accType), obj.description, obj.currencyCode, obj.qty, obj.scale);
        }
        else {
            throw new Error("Invalid AccountObject parameters");
        }
    }
    isValid() {
        return v.isAccountObject(this, true);
    }
}
exports.AccountObject = AccountObject;
