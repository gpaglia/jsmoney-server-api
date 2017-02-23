/**
 * Api objects
 */
"use strict";
/* tslint:disable:no-any max-classes-per-file no-empty-interfaces */
const uuid = require("uuid");
const Big = require("big.js");
const u = require("./utils");
const v = require("./validation");
// Util functions
function toAmount(v) {
    return (v instanceof Big ? v : Big(v));
}
exports.toAmount = toAmount;
// Root types
class ValidatedObject {
}
exports.ValidatedObject = ValidatedObject;
class DomainObject extends ValidatedObject {
    constructor(id = uuid.v4()) {
        super();
        this.id = id;
    }
}
exports.DomainObject = DomainObject;
// Versioned object type
class VersionedObject extends DomainObject {
    constructor(id, version = 0) {
        super(id);
        this.version = version;
    }
}
exports.VersionedObject = VersionedObject;
// Credentials type
class CredentialsObject extends ValidatedObject {
    constructor(username, password) {
        super();
        this.username = username;
        this.password = password;
    }
    static make(obj) {
        if (v.isCredentialsObject(obj)) {
            return new CredentialsObject(obj.username, obj.password);
        }
        else {
            throw new Error("Invalid username or password structure");
        }
    }
    isValid() {
        return v.isCredentialsObject(this);
    }
}
exports.CredentialsObject = CredentialsObject;
// Currency type
class CurrencyObject extends ValidatedObject {
    constructor(code, iso, description, scale) {
        super();
        this.code = code;
        this.iso = iso;
        this.description = description;
        this.scale = scale;
    }
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
// Commodity and related hierarchy
var CommodityType;
(function (CommodityType) {
    CommodityType[CommodityType["currency"] = 0] = "currency";
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
class CommodityObject extends VersionedObject {
    constructor(id, version, code, comType, description, currencyCode, unit = exports.DEFAULT_COMMODITY_UNIT, scale) {
        super(id, version);
        this.code = code;
        this.comType = comType;
        this.description = description;
        this.currencyCode = currencyCode;
        this.unit = unit;
        this.scale = scale;
    }
    isValid() {
        return v.isCommodityObject(this, true);
    }
}
exports.CommodityObject = CommodityObject;
var SecurityType;
(function (SecurityType) {
    SecurityType[SecurityType["bond"] = 0] = "bond";
    SecurityType[SecurityType["stock"] = 1] = "stock";
    SecurityType[SecurityType["fund"] = 2] = "fund";
})(SecurityType = exports.SecurityType || (exports.SecurityType = {}));
exports.SECURITY_TYPE_NAMES = u.getEnumNames(SecurityType);
exports.SECURITY_TYPE_VALUES = u.getEnumValues(SecurityType);
exports.SECURITY_TYPE_NAMES_AND_VALUES = u.getEnumNamesAndValues(SecurityType);
class SecurityObject extends CommodityObject {
    constructor(id, version, code, description, currencyCode, scale, secType, altSymbol, quoteDrivers, lastPrice) {
        super(id, version, code, CommodityType.security, description, currencyCode, exports.DEFAULT_COMMODITY_UNIT, scale);
        this.secType = secType;
        this.altSymbol = altSymbol;
        this.quoteDrivers = quoteDrivers;
        this.lastPrice = (typeof lastPrice === "string" ? Big(lastPrice) : lastPrice);
    }
    static make(obj) {
        if (v.isSecurityObject(obj)) {
            return new SecurityObject(obj.id, obj.version, obj.code, obj.description, obj.currencyCode, obj.scale, u.makeEnumIntValue(SecurityType, obj.secType), obj.altSymbol, obj.quoteDrivers, obj.lastPrice);
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
// User and user role types
var Role;
(function (Role) {
    Role[Role["guest"] = 0] = "guest";
    Role[Role["user"] = 1] = "user";
    Role[Role["administrator"] = 2] = "administrator";
})(Role = exports.Role || (exports.Role = {}));
exports.ROLE_NAMES = u.getEnumNames(Role);
exports.ROLE_VALUES = u.getEnumValues(Role);
exports.ROLE_NAMES_AND_VALUES = u.getEnumNamesAndValues(Role);
class UserObject extends VersionedObject {
    constructor(id, version, username, firstName, lastName, email, role) {
        super(id, version);
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
    }
    static make(obj) {
        if (v.isUserObject(obj)) {
            return new UserObject(obj.id, obj.version, obj.username, obj.firstName, obj.lastName, obj.email, u.makeEnumIntValue(Role, obj.role));
        }
        else {
            throw new Error("Invalid UserObject parameters");
        }
    }
    isValid() {
        return v.isUserObject(this, true);
    }
}
exports.UserObject = UserObject;
class UserAndPasswordObject extends ValidatedObject {
    constructor(user, password) {
        super();
        this.user = user;
        this.password = password;
    }
    static make(obj) {
        if (v.isUserObject(obj.user) && v.isPassword(obj.password)) {
            return new UserAndPasswordObject(obj.user, obj.password);
        }
        else {
            throw new Error("Invalid UserAndPassword parameters");
        }
    }
    isValid() {
        return v.isUserAndPasswordObject(this);
    }
}
exports.UserAndPasswordObject = UserAndPasswordObject;
class AuthenticateDataObject {
    constructor(user, token) {
        this.user = user;
        this.token = token;
    }
    static make(obj) {
        if (v.isAuthenticateDataObject(obj)) {
            return new AuthenticateDataObject(UserObject.make(obj.user), obj.token);
        }
        else {
            throw new Error("Invalid AUthenticateData parameters");
        }
    }
    isValid() {
        return v.isAuthenticateDataObject(this);
    }
}
exports.AuthenticateDataObject = AuthenticateDataObject;
class IAuthenticateDataObject extends AuthenticateDataObject {
}
exports.IAuthenticateDataObject = IAuthenticateDataObject;
// Dataset type
class DatasetObject extends VersionedObject {
    constructor(id, version, userId, name, description, currencyCode, additionalCurrencyCodes) {
        super(id, version);
        this.userId = userId;
        this.name = name;
        this.description = description;
        this.currencyCode = currencyCode;
        this.additionalCurrencyCodes = additionalCurrencyCodes;
    }
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
// Internal precision in calculations
function internalScale(commodity) {
    return commodity.scale + 4;
}
exports.internalScale = internalScale;
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
class AccountObject extends VersionedObject {
    constructor(id, version, name, accType, description, currencyCode, qty, scale) {
        super(id, version);
        this.name = name;
        this.accType = accType;
        this.description = description;
        this.currencyCode = currencyCode;
        this.scale = scale;
        this.qty = toAmount(this.qty);
    }
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
// ***
// Api messages and other stuff
// ***
exports.BEARER = "JWT";
// Requests and Responses
class Body {
    constructor(data) {
        this.data = data;
    }
}
exports.Body = Body;
class RequestData {
    constructor(objref, payload) {
        this.objref = objref;
        this.payload = payload;
    }
}
exports.RequestData = RequestData;
class RequestDataV {
    constructor(objref, payload) {
        this.objref = objref;
        this.payload = payload;
    }
}
exports.RequestDataV = RequestDataV;
class RequestBody extends Body {
    constructor(objref, payload) {
        super(new RequestData(objref, payload));
    }
}
exports.RequestBody = RequestBody;
class RequestBodyV extends Body {
    constructor(objref, payload) {
        super(new RequestDataV(objref, payload));
    }
}
exports.RequestBodyV = RequestBodyV;
function makeBody(obj) {
    return new Body(obj);
}
exports.makeBody = makeBody;
function makeRequestBody(ref, pl) {
    return makeBody(new RequestData(ref, pl));
}
exports.makeRequestBody = makeRequestBody;
function makeRequestBodyV(ref, pl) {
    return makeBody(new RequestDataV(ref, pl));
}
exports.makeRequestBodyV = makeRequestBodyV;
// Dynamic factory
exports.OBJECT_CLASS_PROPERTY_NAME = "_meta_class";
const apidb = {
    [CredentialsObject.name]: CredentialsObject,
    [CurrencyObject.name]: CurrencyObject,
    [SecurityObject.name]: SecurityObject,
    [UserObject.name]: UserObject,
    [UserAndPasswordObject.name]: UserAndPasswordObject,
    [DatasetObject.name]: DatasetObject,
    [AccountObject.name]: AccountObject,
    [AuthenticateDataObject.name]: AuthenticateDataObject
};
function apiObjectFactory(obj, clazz) {
    const name = clazz ? clazz.name : obj[exports.OBJECT_CLASS_PROPERTY_NAME];
    if (name == null) {
        return undefined;
    }
    else {
        const c = apidb[name];
        if (c == null) {
            return undefined;
        }
        else {
            return c.make(obj);
        }
    }
}
exports.apiObjectFactory = apiObjectFactory;
