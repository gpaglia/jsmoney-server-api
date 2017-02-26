/**
 * jasmine test spec
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Big = require("big.js");
const uuid = require("uuid");
const v = require("./validation.js");
const api_objects_1 = require("./api.objects");
describe("BigJS", () => {
    it("test", () => {
        const B = new Big(123);
        expect(B instanceof Big).toBe(true);
        expect(B.constructor.name).toBe("Big");
        expect(Big.name).toBe("Big");
        expect(typeof Big).toBe("function");
        expect(typeof B).toBe("object");
    });
});
describe("Basic validators", () => {
    class A {
    }
    let a = new A();
    var E;
    (function (E) {
        E[E["E1"] = 0] = "E1";
        E[E["E2"] = 1] = "E2";
        E[E["E3"] = 2] = "E3";
    })(E || (E = {}));
    const e = E.E1;
    it("isNull", () => {
        expect(v.isNull(null)).toBe(true);
        expect(v.isNull(undefined)).toBe(true);
        expect(v.isNull("a")).toBe(false);
        expect(v.isNull("")).toBe(false);
        expect(v.isNull({})).toBe(false);
    });
    it("isDefined", () => {
        expect(v.isDefined(null)).toBe(false);
        expect(v.isDefined(undefined)).toBe(false);
        expect(v.isDefined("a")).toBe(true);
        expect(v.isDefined("")).toBe(true);
        expect(v.isDefined({})).toBe(true);
    });
    it("isOfType", () => {
        expect(v.isOfType("a", "string")).toBe(true);
        expect(v.isOfType(12, "number")).toBe(true);
        expect(v.isOfType(true, "boolean")).toBe(true);
        expect(v.isOfType([1], "object")).toBe(true);
        expect(v.isOfType({}, "object")).toBe(true);
        expect(v.isOfType(A, "function")).toBe(true);
    });
    it("isOfTypeOrNull", () => {
        expect(v.isOfTypeOrNull("a", "string")).toBe(true);
        expect(v.isOfTypeOrNull(null, "number")).toBe(true);
        expect(v.isOfTypeOrNull(undefined, "boolean")).toBe(true);
        expect(v.isOfTypeOrNull([1], "object")).toBe(true);
        expect(v.isOfTypeOrNull(null, "object")).toBe(true);
    });
    it("isInstanceOf", () => {
        expect(v.isDefined(a)).toBe(true);
        expect(v.isInstanceOf(a, A)).toBe(true);
        expect(v.isInstanceOf([], Array)).toBe(true);
        expect(v.isInstanceOf(a, Object)).toBe(true);
        expect(v.isInstanceOf({}, A)).toBe(false);
    });
    it("isArray", () => {
        expect(v.isArray(a)).toBe(false);
        expect(v.isArray([])).toBe(true);
        expect(v.isArray({})).toBe(false);
    });
    it("isArrayDeep", () => {
        expect(v.isArrayDeep(a)).toBe(false);
        expect(v.isArrayDeep([])).toBe(true);
        expect(v.isArrayDeep({})).toBe(false);
        let fn = (x) => { return v.isOfType(x, "number"); };
        expect(v.isArrayDeep([1, 2, 3], fn)).toBe(true);
        expect(v.isArrayDeep([1, "a", 3], fn)).toBe(false);
    });
    it("isStringLen", () => {
        expect(v.isStringLen("1234", 2)).toBe(true);
        expect(v.isStringLen("1234", 2, 6)).toBe(true);
        expect(v.isStringLen("1234", 7)).toBe(false);
        expect(v.isStringLen("", 2)).toBe(false);
    });
    it("isStringLen", () => {
        expect(v.isInt(12)).toBe(true);
        expect(v.isInt(12.3)).toBe(false);
        expect(v.isInt("a")).toBe(false);
    });
    it("isIntRange", () => {
        expect(v.isIntRange(3, 0, 5)).toBe(true);
        expect(v.isIntRange(3, 0, 2)).toBe(false);
        expect(v.isIntRange(3.5, 0, 5)).toBe(false);
        expect(v.isIntRange("a", 0, 5)).toBe(false);
        expect(v.isIntRange(3000, 0)).toBe(true);
    });
    it("isStringInSet", () => {
        expect(v.isStringInSet("a", ["b", "a", "c"])).toBe(true);
        expect(v.isStringInSet("a", ["b", "d", "c"])).toBe(false);
        expect(v.isStringInSet(12, ["b", "a", "c"])).toBe(false);
    });
    it("isNumberInSet", () => {
        expect(v.isNumberInSet(3.2, [1.1, 2.3, 3.2])).toBe(true);
        expect(v.isNumberInSet("a", [1.1, 2.3, 3.2])).toBe(false);
        expect(v.isNumberInSet(12, [1.1, 2.3, 3.2])).toBe(false);
    });
    it("isIntInSet", () => {
        expect(v.isIntInSet(3, [1, 2, 3])).toBe(true);
        expect(v.isIntInSet("a", [1, 2, 3])).toBe(false);
        expect(v.isIntInSet(12, [1, 2, 3])).toBe(false);
    });
    it("isEnumType", () => {
        expect(v.isEnumType(e, E)).toBe(true);
        expect(v.isEnumType(E.E1, E)).toBe(true);
        expect(v.isEnumType("E1", E)).toBe(true);
        expect(v.isEnumType("E7", E)).toBe(false);
        expect(v.isEnumType(15, E)).toBe(false);
    });
    it("isEnumKey", () => {
        expect(v.isEnumKey(e, E)).toBe(false);
        expect(v.isEnumKey(E.E1, E)).toBe(false);
        expect(v.isEnumKey("E1", E)).toBe(true);
        expect(v.isEnumKey(E[e], E)).toBe(true);
    });
    it("isEnumValue", () => {
        expect(v.isEnumValue(E[e], E)).toBe(false);
        expect(v.isEnumValue(E.E1, E)).toBe(true);
        expect(v.isEnumValue("E1", E)).toBe(false);
    });
});
describe("Field validators", () => {
    const id1 = uuid.v4();
    const longstr = "1234567890123456789012345678901234567890"; // len 40
    it("isId", () => {
        expect(v.isId(id1)).toBe(true);
        expect(v.isId("ciao")).toBe(false);
        expect(v.isId(undefined)).toBe(false);
    });
    it("isVersion", () => {
        expect(v.isVersion(12)).toBe(true);
        expect(v.isVersion(0)).toBe(true);
        expect(v.isVersion("abc")).toBe(false);
        expect(v.isVersion(-1)).toBe(false);
    });
    it("isUsername", () => {
        expect(v.isUsername("username")).toBe(true); // len ok
        expect(v.isUsername("ab")).toBe(false); // too short
        expect(v.isUsername("1234567890123456")).toBe(false); // too long
        expect(v.isUsername("1aaaaa")).toBe(false); // starts with digit
        expect(v.isUsername("a42gp")).toBe(true); // ok
        expect(v.isUsername("gp&abc")).toBe(false); // special char
        expect(v.isUsername(12)).toBe(false); // not a string
    });
    it("isPassword", () => {
        expect(v.isPassword("username")).toBe(true); // len ok
        expect(v.isPassword("ab")).toBe(false); // too short
        expect(v.isPassword("1234567890123456")).toBe(false); // too long
        expect(v.isPassword("1aaaaaxxxx")).toBe(true); // starts with digit but ok
        expect(v.isPassword("a42gpxxxxx")).toBe(true); // ok
        expect(v.isPassword("gp&abcxxxx")).toBe(true); // special char
        expect(v.isPassword(12)).toBe(false); // not a string
    });
    it("isName", () => {
        expect(v.isName("abc")).toBe(true);
        expect(v.isName(12)).toBe(false); // not a string
        expect(v.isName(longstr)).toBe(false); // too long
    });
    it("isCurrencyCode", () => {
        expect(v.isCurrencyCode("EUR")).toBe(true);
        expect(v.isCurrencyCode("EUR2")).toBe(false);
        expect(v.isCurrencyCode("eur")).toBe(false);
        expect(v.isCurrencyCode("E")).toBe(false);
        expect(v.isCurrencyCode(12)).toBe(false);
    });
    it("isCurrencyIso", () => {
        expect(v.isCurrencyIso("123")).toBe(true);
        expect(v.isCurrencyIso("eur")).toBe(false);
        expect(v.isCurrencyIso("1")).toBe(false);
        expect(v.isCurrencyIso(123)).toBe(false);
    });
    it("isCurrencyScale", () => {
        expect(v.isCurrencyScale(3)).toBe(true);
        expect(v.isCurrencyScale(42)).toBe(false);
        expect(v.isCurrencyScale("1")).toBe(false);
        expect(v.isCurrencyScale(3.2)).toBe(false);
    });
    it("isCommodityScale", () => {
        expect(v.isCommodityScale(3)).toBe(true);
        expect(v.isCommodityScale(42)).toBe(false);
        expect(v.isCommodityScale("1")).toBe(false);
        expect(v.isCommodityScale(3.2)).toBe(false);
    });
    it("isCurrencyCodeList", () => {
        expect(v.isCurrencyCodeList(["EUR", "USD"])).toBe(true);
        expect(v.isCurrencyCode(["eur", "EUR"])).toBe(false);
        expect(v.isCurrencyCode("E")).toBe(false);
        expect(v.isCurrencyCode(["EUR", 12])).toBe(false);
    });
    it("isRole", () => {
        const r = api_objects_1.Role.guest;
        const rstr = api_objects_1.Role[r];
        expect(v.isRole(r)).toBe(true);
        expect(v.isRole(rstr)).toBe(true);
        expect(v.isRole(1)).toBe(true);
        expect(v.isRole("ciao")).toBe(false);
        expect(v.isRole(43)).toBe(false);
    });
    it("isCommodityType", () => {
        const r = api_objects_1.CommodityType.home;
        const rstr = api_objects_1.CommodityType[r];
        expect(v.isCommodityType(r)).toBe(true);
        expect(v.isCommodityType(rstr)).toBe(true);
        expect(v.isCommodityType(1)).toBe(true);
        expect(v.isCommodityType("ciao")).toBe(false);
        expect(v.isCommodityType(43)).toBe(false);
    });
    it("isSecurityType", () => {
        const r = api_objects_1.SecurityType.fund;
        const rstr = api_objects_1.SecurityType[r];
        expect(v.isSecurityType(r)).toBe(true);
        expect(v.isSecurityType(rstr)).toBe(true);
        expect(v.isSecurityType(1)).toBe(true);
        expect(v.isSecurityType("ciao")).toBe(false);
        expect(v.isSecurityType(43)).toBe(false);
    });
    it("isAccountType", () => {
        const r = api_objects_1.AccountType.cash;
        const rstr = api_objects_1.AccountType[r];
        expect(v.isAccountType(r)).toBe(true);
        expect(v.isAccountType(rstr)).toBe(true);
        expect(v.isAccountType(1)).toBe(true);
        expect(v.isAccountType("ciao")).toBe(false);
        expect(v.isAccountType(43)).toBe(false);
    });
    it("isDateProp", () => {
        expect(v.isDateProp(new Date())).toBe(true);
        expect(v.isDateProp(123456)).toBe(true);
        expect(v.isDateProp("2017-25-17")).toBe(false);
    });
});
describe("Object validators", () => {
    const ID = uuid.v4(); // a valid uuid
    const SEC = api_objects_1.CommodityType.security;
    const CR = api_objects_1.CommodityType.currencyrate;
    it("IsObjectReference", () => {
        expect(v.isObjectReference({
            id: ID,
            version: 12
        })).toBe(true);
        expect(v.isObjectReference({
            id: "abc",
            version: 12
        })).toBe(false);
        expect(v.isObjectReference({
            id: ID,
            version: -1
        })).toBe(false);
    });
    it("isCredentialsObject", () => {
        expect(v.isCredentialsObject({
            username: "username",
            password: "password"
        })).toBe(true);
        expect(v.isCredentialsObject({
            usernamex: "username",
            password: "password"
        })).toBe(false);
        expect(v.isCredentialsObject({
            username: "u",
            password: "password"
        })).toBe(false);
        expect(v.isCredentialsObject({
            username: "username"
        })).toBe(false);
    });
    it("isCurrencyObject", () => {
        expect(v.isCurrencyObject({
            code: "EUR",
            iso: "123",
            description: "desc",
            scale: 3
        })).toBe(true);
        expect(v.isCurrencyObject({
            code: "EUR",
            description: "desc",
            scale: 3
        })).toBe(false);
        expect(v.isCurrencyObject({
            code: "EUR2",
            iso: "123",
            description: "desc",
            scale: 3
        })).toBe(false);
        expect(v.isCurrencyObject({
            code: "EUR2",
            iso: 123,
            description: "desc",
            scale: 3
        })).toBe(false);
    });
    // CurrencyRate
    it("isCurrencyRateObject-1", () => {
        expect(v.isCurrencyRateObject({
            id: ID,
            version: 12,
            code: "USD",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            comType: CR,
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(true);
        expect(v.isCurrencyRateObject({
            code: "USD",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            comType: CR,
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(true);
        expect(v.isCurrencyRateObject({
            id: ID,
            version: 12,
            code: "USD",
            description: "adescription",
            currencyCode: "EUR2",
            scale: 3,
            comType: CR,
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(false);
        expect(v.isCurrencyRateObject({
            id: ID,
            version: 12,
            code: "USD2",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            comType: CR,
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(false);
    });
    it("isCurrencyRateObject-2", () => {
        expect(v.isCurrencyRateObject({
            id: ID,
            version: 12,
            code: "USD",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            comType: CR,
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        }, true)).toBe(true);
        expect(v.isCurrencyRateObject({
            id: ID,
            version: 12,
            code: "USD",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        }, true)).toBe(false);
        expect(v.isCurrencyRateObject({
            id: ID,
            version: 12,
            code: "USD",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            comType: CR,
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(true);
        expect(v.isCurrencyRateObject({
            id: ID,
            version: 12,
            code: "USD",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            comType: CR,
            altSymbol: "alt",
            quoteDrivers: ["a", "b"],
            lastPrice: Big(123),
            lastPriceDate: 12345,
            lastPriceInfo: "Info"
        })).toBe(true);
        expect(v.isCurrencyRateObject({
            id: ID,
            version: 12,
            code: "USD",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            quoteDrivers: ["a", "b"]
        })).toBe(true);
        expect(v.isCurrencyRateObject({
            id: ID,
            version: 12,
            code: "USD",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            quoteDrivers: ["a", "b"],
            lastPriceInfo: "info"
        })).toBe(false);
        expect(v.isCurrencyRateObject({
            id: ID,
            version: 12,
            code: "USD",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45-"
        })).toBe(false);
    });
    // Security
    it("isSecurityObject-1", () => {
        expect(v.isSecurityObject({
            id: ID,
            version: 12,
            code: "acode",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            secType: api_objects_1.SecurityType.bond,
            comType: SEC,
            altSymbol: "alt",
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(true);
        expect(v.isSecurityObject({
            code: "acode",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            secType: api_objects_1.SecurityType.bond,
            comType: SEC,
            altSymbol: "alt",
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(true);
        expect(v.isSecurityObject({
            id: ID,
            version: 12,
            code: "acode",
            description: "adescription",
            currencyCode: "EUR2",
            scale: 3,
            secType: api_objects_1.SecurityType.bond,
            comType: SEC,
            altSymbol: "alt",
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(false);
        expect(v.isSecurityObject({
            id: ID,
            version: 12,
            code: "acode",
            description: "adescription",
            currencyCode: "EUR",
            scale: 33,
            secType: api_objects_1.SecurityType.bond,
            comType: SEC,
            altSymbol: "alt",
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(false);
    });
    it("isSecurityObject-2", () => {
        expect(v.isSecurityObject({
            id: ID,
            version: 12,
            code: "acode",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            secType: "bond",
            comType: SEC,
            altSymbol: "alt",
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(true);
        expect(v.isSecurityObject({
            id: ID,
            version: 12,
            code: "acode",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            secType: 123,
            comType: SEC,
            altSymbol: "alt",
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(false);
        expect(v.isSecurityObject({
            id: ID,
            version: 12,
            code: "acode",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            secType: api_objects_1.SecurityType.bond,
            comType: 17,
            altSymbol: "alt",
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(false);
        expect(v.isSecurityObject({
            id: ID,
            version: 12,
            code: "acode",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            secType: api_objects_1.SecurityType.bond,
            comType: SEC,
            quoteDrivers: ["a", "b"]
        })).toBe(true);
        expect(v.isSecurityObject({
            id: ID,
            version: 12,
            code: "acode",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            secType: api_objects_1.SecurityType.bond,
            comType: SEC,
            altSymbol: "alt",
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(true);
        expect(v.isSecurityObject({
            id: ID,
            version: 12,
            code: "acode",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            secType: api_objects_1.SecurityType.bond,
            comType: SEC,
            altSymbol: "alt",
            quoteDrivers: ["a", "b"],
            lastPrice: Big(123),
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(true);
        expect(v.isSecurityObject({
            id: ID,
            version: 12,
            code: "acode",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            secType: api_objects_1.SecurityType.bond,
            comType: SEC,
            altSymbol: "alt",
            quoteDrivers: ["a", "b"],
            lastPrice: "+123.45",
            lastPriceDate: 12345,
            lastPriceInfo: "Info"
        })).toBe(true);
        expect(v.isSecurityObject({
            id: ID,
            version: 12,
            code: "acode",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            secType: api_objects_1.SecurityType.bond,
            comType: SEC,
            altSymbol: "alt",
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45-",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(false);
    });
    it("isUserObject", () => {
        expect(v.isUserObject({
            id: ID,
            version: 12,
            username: "username",
            firstName: "afirstname",
            lastName: "alastname",
            email: "a.b@c.com",
            role: api_objects_1.Role.guest
        })).toBe(true);
        expect(v.isUserObject({
            id: ID,
            version: 12,
            username: "u",
            firstName: "afirstname",
            lastName: "alastname",
            email: "a.b@c.com",
            role: api_objects_1.Role.guest
        })).toBe(false);
        expect(v.isUserObject({
            id: ID,
            version: 12,
            username: "username",
            lastName: "alastname",
            email: "a.b@c.com",
            role: api_objects_1.Role.guest
        })).toBe(false);
        expect(v.isUserObject({
            id: ID,
            version: 12,
            username: "username",
            firstName: "afirstname",
            lastName: "alastname",
            role: api_objects_1.Role.guest
        })).toBe(false);
        expect(v.isUserObject({
            id: ID,
            version: 12,
            username: "username",
            firstName: "afirstname",
            lastName: "alastname",
            email: "xyz",
            role: api_objects_1.Role.guest
        })).toBe(false);
        expect(v.isUserObject({
            id: ID,
            version: 12,
            username: "username",
            firstName: "afirstname",
            lastName: "alastname",
            email: "a.b@c.com",
            role: "guest"
        })).toBe(true);
        expect(v.isUserObject({
            id: ID,
            version: 12,
            username: "username",
            firstName: "afirstname",
            lastName: "alastname",
            email: "a.b@c.com",
            role: 1234
        })).toBe(false);
    });
    it("isAuthenticateDataObject", () => {
        expect(v.isAuthenticateDataObject({
            user: {
                id: ID,
                version: 12,
                username: "username",
                firstName: "afirstname",
                lastName: "alastname",
                email: "a.b@c.com",
                role: api_objects_1.Role.guest
            },
            token: "astring"
        })).toBe(true);
        expect(v.isAuthenticateDataObject({
            user: {
                id: ID,
                version: 12,
                username: "username",
                firstName: "afirstname",
                lastName: "alastname",
                email: "a.b@c.com",
                role: api_objects_1.Role.guest
            }
        })).toBe(false);
        expect(v.isAuthenticateDataObject({
            user: {
                id: ID,
                version: 12,
                username: "username",
                firstName: "afirstname",
                lastName: "alastname",
                email: "a.b@c.com",
                role: api_objects_1.Role.guest
            },
            token: 123
        })).toBe(false);
        expect(v.isAuthenticateDataObject({
            user: {
                id: ID,
                version: 12,
                username: "username",
                firstName: "afirstname",
                lastName: "alastname",
                email: "a.b@c.com"
            },
            token: "astring"
        })).toBe(false);
    });
    it("isUserAndPasswordObject", () => {
        expect(v.isUserAndPasswordObject({
            user: {
                id: ID,
                version: 12,
                username: "username",
                firstName: "afirstname",
                lastName: "alastname",
                email: "a.b@c.com",
                role: api_objects_1.Role.guest
            },
            password: "apwdstring"
        })).toBe(true);
        expect(v.isUserAndPasswordObject({
            user: {
                id: ID,
                version: 12,
                username: "username",
                firstName: "afirstname",
                lastName: "alastname",
                email: "a.b@c.com",
                role: api_objects_1.Role.guest
            }
        })).toBe(false);
        expect(v.isUserAndPasswordObject({
            user: {
                id: ID,
                version: 12,
                username: "username",
                firstName: "afirstname",
                lastName: "alastname",
                email: "a.b@c.com",
                role: api_objects_1.Role.guest
            },
            password: 123
        })).toBe(false);
        expect(v.isUserAndPasswordObject({
            user: {
                id: ID,
                version: 12,
                username: "username",
                firstName: "afirstname",
                lastName: "alastname",
                email: "a.b@c.com"
            },
            password: "apwdstring"
        })).toBe(false);
    });
    it("isDatasetObject", () => {
        expect(v.isDatasetObject({
            id: ID,
            version: 12,
            userRef: { id: ID, version: 12 },
            name: "thisismyname",
            currencyCode: "EUR",
            additionalCurrencyCodes: ["USD", "JPY"]
        })).toBe(true);
        expect(v.isDatasetObject({
            id: ID,
            version: 12,
            userRef: { id: ID, version: 12 },
            name: "thisismyname",
            currencyCode: "EUR2",
            additionalCurrencyCodes: ["USD", "JPY"]
        })).toBe(false);
        expect(v.isDatasetObject({
            id: ID,
            version: 12,
            userRef: { id: ID, version: 12 },
            currencyCode: "EUR",
            additionalCurrencyCodes: ["USD", "JPY"]
        })).toBe(false);
        expect(v.isDatasetObject({
            id: ID,
            version: 12,
            userRef: { id: ID, version: 12 },
            name: "thisismyname",
            additionalCurrencyCodes: ["USD", "JPY"]
        })).toBe(false);
        expect(v.isDatasetObject({
            id: ID,
            version: 12,
            userRef: { id: ID, version: 12 },
            name: "thisismyname",
            currencyCode: "EUR"
        })).toBe(false);
        expect(v.isDatasetObject({
            id: ID,
            version: 12,
            name: "thisismyname",
            currencyCode: "EUR",
            additionalCurrencyCodes: []
        })).toBe(false);
        expect(v.isDatasetObject({
            id: ID,
            version: 12,
            userRef: { id: ID, version: 12, other: "other" },
            name: "thisismyname",
            currencyCode: "EUR",
            additionalCurrencyCodes: []
        })).toBe(true);
    });
    it("isAccountObject", () => {
        // to be defined
    });
});
