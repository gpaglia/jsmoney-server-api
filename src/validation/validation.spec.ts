/**
 * jasmine test spec
 */

import * as Big from "big.js";
import * as uuid from "uuid";
import * as v from "./validation.js";

import {
    AccountType,
    CommodityType,
    Role,
    SecurityType
} from "../api-objects";

describe("BigJS", () => {
    it("test", () => {
        const B: BigJsLibrary.BigJS = new Big(123);
        expect(B instanceof Big).toBe(true);
        expect(B.constructor.name).toBe("Big");
        expect(Big.name).toBe("Big");
        expect(typeof Big).toBe("function");
        expect(typeof B).toBe("object");
    });
});

describe("Basic validators", () => {
    class A {
        public p1: number;
        public p2: string;
    }

    const a: A = new A();

    enum E {
        E1, E2, E3
    }

    const e: number = E.E1;

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

        const fn: v.CheckerFunction = (x) => { return v.isOfType(x, "number"); };

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
    const id1: string = uuid.v4();
    const longstr: string = "1234567890123456789012345678901234567890";    // len 40

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
        expect(v.isUsername("username")).toBe(true);    // len ok
        expect(v.isUsername("ab")).toBe(false);         // too short
        expect(v.isUsername("1234567890123456")).toBe(false);   // too long
        expect(v.isUsername("1aaaaa")).toBe(false);     // starts with digit
        expect(v.isUsername("a42gp")).toBe(true);       // ok
        expect(v.isUsername("gp&abc")).toBe(false);     // special char
        expect(v.isUsername(12)).toBe(false);           // not a string
    });

    it("isPassword", () => {
        expect(v.isPassword("username")).toBe(true);    // len ok
        expect(v.isPassword("ab")).toBe(false);         // too short
        expect(v.isPassword("1234567890123456")).toBe(false);   // too long
        expect(v.isPassword("1aaaaaxxxx")).toBe(true);     // starts with digit but ok
        expect(v.isPassword("a42gpxxxxx")).toBe(true);     // ok
        expect(v.isPassword("gp&abcxxxx")).toBe(true);     // special char
        expect(v.isPassword(12)).toBe(false);               // not a string

    });

    it("isName", () => {
        expect(v.isName("abc")).toBe(true);
        expect(v.isName(12)).toBe(false);             // not a string
        expect(v.isName(longstr)).toBe(false);        // too long
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
        const r: number = Role.guest;
        const rstr: string = Role[r];

        expect(v.isRole(r)).toBe(true);
        expect(v.isRole(rstr)).toBe(true);
        expect(v.isRole(1)).toBe(true);
        expect(v.isRole("ciao")).toBe(false);
        expect(v.isRole(43)).toBe(false);
    });

    it("isCommodityType", () => {
        const r: number = CommodityType.home;
        const rstr: string = CommodityType[r];

        expect(v.isCommodityType(r)).toBe(true);
        expect(v.isCommodityType(rstr)).toBe(true);
        expect(v.isCommodityType(1)).toBe(true);
        expect(v.isCommodityType("ciao")).toBe(false);
        expect(v.isCommodityType(43)).toBe(false);
    });

    it("isSecurityType", () => {
        const r: number = SecurityType.fund;
        const rstr: string = SecurityType[r];

        expect(v.isSecurityType(r)).toBe(true);
        expect(v.isSecurityType(rstr)).toBe(true);
        expect(v.isSecurityType(1)).toBe(true);
        expect(v.isSecurityType("ciao")).toBe(false);
        expect(v.isSecurityType(43)).toBe(false);
    });

    it("isAccountType", () => {
        const r: number = AccountType.cash;
        const rstr: string = AccountType[r];

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
    const ID = uuid.v4();                   // a valid uuid
    const SEC = CommodityType.security;
    const CR = CommodityType.currencyrate;

    it("IsObjectReference", () => {
        expect(v.isObjectReference({
            id: ID,
            version: 12
        })).toBe(true, "Obj ref with ID and version");

        expect(v.isObjectReference({
            id: "abc",
            version: 12
        })).toBe(false, "Obj ref with wrong ID");

        expect(v.isObjectReference({
            id: ID,
            version: -1
        })).toBe(false, "Obj ref with ID and negative version");

    });

    it("isCredentialsObject", () => {
        expect(v.isCredentialsObject({
            username: "username",
            password: "password"
        })).toBe(true, "Credentials OK");

        expect(v.isCredentialsObject({
            usernamex: "username",
            password: "password"
        })).toBe(false, "Cred with incorrect fields");

        expect(v.isCredentialsObject({
            username: "u",
            password: "password"
        })).toBe(false, "Cred with username too short");

        expect(v.isCredentialsObject({
            username: "username"
        })).toBe(false, "Cred without pwd");

    });

    it("isCurrencyObject", () => {
        expect(v.isCurrencyObject({
            code: "EUR",
            iso: "123",
            description: "desc",
            scale: 3
        })).toBe(true, "currencyObj OK");

        expect(v.isCurrencyObject({
            code: "EUR",
            description: "desc",
            scale: 3
        })).toBe(false, "CurrencyObj no iso");

        expect(v.isCurrencyObject({
            code: "EUR2",
            iso: "123",
            description: "desc",
            scale: 3
        })).toBe(false, "CurrencyObj invalid code");

        expect(v.isCurrencyObject({
            code: "EUR",
            iso: 123,
            description: "desc",
            scale: 3
        })).toBe(false, "CurrencyObj numeric iso");
    });

    // CurrencyRate
    it("isCurrencyRateObject-1", () => {

        expect(v.isCurrencyRateObject({
            id: ID,
            version: 12,
            datasetId: ID,
            code: "USD",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            comType: CR,
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(true, "Currencyrate OK");

        expect(v.isCurrencyRateObject({
            datasetId: ID,
            code: "USD",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            comType: CR,
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(true, "CurrencyRate OK no ID and v");

        expect(v.isCurrencyRateObject({
            id: ID,
            version: 12,
            datasetId: ID,
            code: "USD",
            description: "adescription",
            currencyCode: "EUR2",
            scale: 3,
            comType: CR,
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(false, "CurrencyRate KO wrong currency code");

        expect(v.isCurrencyRateObject({
            id: ID,
            version: 12,
            datasetId: ID,
            code: "USD2",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            comType: CR,
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(false, "CurrencyRate KO wrokg main code");
    });

    it("isCurrencyRateObject-2", () => {
        expect(v.isCurrencyRateObject(
            {
                id: ID,
                version: 12,
                datasetId: ID,
                code: "USD",
                description: "adescription",
                currencyCode: "EUR",
                scale: 3,
                comType: CR,
                quoteDrivers: ["a", "b"],
                lastPrice: "123.45",
                lastPriceDate: new Date(),
                lastPriceInfo: "Info"
            },
            true)).toBe(true, "CurrencyRate OK - 2");

        expect(v.isCurrencyRateObject(
            {
                id: ID,
                version: 12,
                datasetId: ID,
                code: "USD",
                description: "adescription",
                currencyCode: "EUR",
                scale: 3,
                quoteDrivers: ["a", "b"],
                lastPrice: "123.45",
                lastPriceDate: new Date(),
                lastPriceInfo: "Info"
            },
            true)).toBe(false, "CurrencyRate KO why??");

        expect(v.isCurrencyRateObject({
            id: ID,
            version: 12,
            datasetId: ID,
            code: "USD",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            comType: CR,
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(true, "CurrencyRate OK also");

        expect(v.isCurrencyRateObject({
            id: ID,
            version: 12,
            datasetId: ID,
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
        })).toBe(true, "CurrencyRate OK Big price");

        expect(v.isCurrencyRateObject({
            id: ID,
            version: 12,
            datasetId: ID,
            code: "USD",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            quoteDrivers: ["a", "b"]
        })).toBe(true, "CurrencyRate OK  No price data");

        expect(v.isCurrencyRateObject({
            id: ID,
            version: 12,
            code: "USD",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            quoteDrivers: ["a", "b"]
        })).toBe(false, "CurrencyRate KO no datasetId");

        expect(v.isCurrencyRateObject({
            id: ID,
            version: 12,
            datasetId: ID,
            code: "USD",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            quoteDrivers: ["a", "b"],
            lastPriceInfo: "info"
        })).toBe(false, "CurrencyRate KO no price but priceinfo present");

        expect(v.isCurrencyRateObject({
            id: ID,
            version: 12,
            datasetId: ID,
            code: "USD",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45-"
        })).toBe(false, "CurrencyRate KO invalid price data");
    });

    // Security
    it("isSecurityObject-1", () => {

        expect(v.isSecurityObject({
            id: ID,
            version: 12,
            datasetId: ID,
            code: "acode",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            secType: SecurityType.bond,
            comType: SEC,
            altSymbol: "alt",
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(true, "SecurityObject OK");

        expect(v.isSecurityObject({
            datasetId: ID,
            code: "acode",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            secType: SecurityType.bond,
            comType: SEC,
            altSymbol: "alt",
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(true, "SecurityObject OK no ID and v");

        expect(v.isSecurityObject({
            id: ID,
            version: 12,
            datasetId: ID,
            code: "acode",
            description: "adescription",
            currencyCode: "EUR2",
            scale: 3,
            secType: SecurityType.bond,
            comType: SEC,
            altSymbol: "alt",
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(false, "SecurityObject KO wrong currency code");

        expect(v.isSecurityObject({
            id: ID,
            version: 12,
            datasetId: ID,
            code: "acode",
            description: "adescription",
            currencyCode: "EUR",
            scale: 33,
            secType: SecurityType.bond,
            comType: SEC,
            altSymbol: "alt",
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(false, "SecurityObject KO scale too big");
    });

    it("isSecurityObject-2", () => {
        expect(v.isSecurityObject({
            id: ID,
            version: 12,
            datasetId: ID,
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
        })).toBe(true, "SecurityObject OK 2");

        expect(v.isSecurityObject({
            id: ID,
            version: 12,
            datasetId: ID,
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
        })).toBe(false, "SecurityObject KO why??");

        expect(v.isSecurityObject({
            id: ID,
            version: 12,
            datasetId: ID,
            code: "acode",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            secType: SecurityType.bond,
            comType: 17,
            altSymbol: "alt",
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(false, "SecurityObject KO comType wrong");

        expect(v.isSecurityObject({
            id: ID,
            version: 12,
            datasetId: ID,
            code: "acode",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            secType: SecurityType.bond,
            comType: SEC,
            quoteDrivers: ["a", "b"]
        })).toBe(true, "SecurityObject OK no altSymbol ");

        expect(v.isSecurityObject({
            id: ID,
            version: 12,
            datasetId: ID,
            code: "acode",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            secType: SecurityType.bond,
            comType: SEC,
            altSymbol: "alt",
            lastPrice: "123.45",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(true, "SecurityObject OK also");

        expect(v.isSecurityObject({
            id: ID,
            version: 12,
            datasetId: ID,
            code: "acode",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            secType: SecurityType.bond,
            comType: SEC,
            altSymbol: "alt",
            quoteDrivers: ["a", "b"],
            lastPrice: Big(123),
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(true, "SecurityObject OK Big price");

        expect(v.isSecurityObject({
            id: ID,
            version: 12,
            datasetId: ID,
            code: "acode",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            secType: SecurityType.bond,
            comType: SEC,
            altSymbol: "alt",
            quoteDrivers: ["a", "b"],
            lastPrice: "+123.45",
            lastPriceDate: 12345,
            lastPriceInfo: "Info"
        })).toBe(true, "SecurityObject OK price with +");

        expect(v.isSecurityObject({
            id: ID,
            version: 12,
            datasetId: ID,
            code: "acode",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            secType: SecurityType.bond,
            comType: SEC,
            altSymbol: "alt",
            quoteDrivers: ["a", "b"],
            lastPrice: "+123.45",
            lastPriceDate: 12345,
            lastPriceInfo: "Info"
        })).toBe(true, "SecurityObject OK date serial");

        expect(v.isSecurityObject({
            id: ID,
            version: 12,
            code: "acode",
            description: "adescription",
            currencyCode: "EUR",
            scale: 3,
            secType: SecurityType.bond,
            comType: SEC,
            altSymbol: "alt",
            quoteDrivers: ["a", "b"],
            lastPrice: "123.45-",
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        })).toBe(false, "SecurityObject KO no datasetId");
    });

    it("isUserObject", () => {

        expect(v.isUserObject({
            id: ID,
            version: 12,
            username: "username",
            firstName: "afirstname",
            lastName: "alastname",
            email: "a.b@c.com",
            role: Role.guest
        })).toBe(true, "UserObject OK");

        expect(v.isUserObject({
            id: ID,
            version: 12,
            username: "u",
            firstName: "afirstname",
            lastName: "alastname",
            email: "a.b@c.com",
            role: Role.guest
        })).toBe(false, "UserObject KO username too short");

        expect(v.isUserObject({
            id: ID,
            version: 12,
            username: "username",
            lastName: "alastname",
            email: "a.b@c.com",
            role: Role.guest
        })).toBe(false, "UserObject KO no firstname??");

        expect(v.isUserObject({
            id: ID,
            version: 12,
            username: "username",
            firstName: "afirstname",
            lastName: "alastname",
            role: Role.guest
        })).toBe(false, "UserObject KO no email");

        expect(v.isUserObject({
            id: ID,
            version: 12,
            username: "username",
            firstName: "afirstname",
            lastName: "alastname",
            email: "xyz",
            role: Role.guest
        })).toBe(false, "UserObject KO wrong email format");

        expect(v.isUserObject({
            id: ID,
            version: 12,
            username: "username",
            firstName: "afirstname",
            lastName: "alastname",
            email: "a.b@c.com",
            role: "guest"
        })).toBe(true, "UserObject OK string role");

        expect(v.isUserObject({
            id: ID,
            version: 12,
            username: "username",
            firstName: "afirstname",
            lastName: "alastname",
            email: "a.b@c.com",
            role: 1234
        })).toBe(false, "UserObject KO wrong role");

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
                role: Role.guest
            },
            token: "astring"
        })).toBe(true, "AuthObj OK");

        expect(v.isAuthenticateDataObject({
            user: {
                id: ID,
                version: 12,
                username: "username",
                firstName: "afirstname",
                lastName: "alastname",
                email: "a.b@c.com",
                role: Role.guest
            }
        })).toBe(false, "AuthObj KO no token");

        expect(v.isAuthenticateDataObject({
            user: {
                id: ID,
                version: 12,
                username: "username",
                firstName: "afirstname",
                lastName: "alastname",
                email: "a.b@c.com",
                role: Role.guest
            },
            token: 123
        })).toBe(false, "AuthObj KO token not string");

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
        })).toBe(false, "AuthObj no role");

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
                role: Role.guest
            },
            password: "apwdstring"
        })).toBe(true, "UserAndPasswordObj OK");

        expect(v.isUserAndPasswordObject({
            user: {
                id: ID,
                version: 12,
                username: "username",
                firstName: "afirstname",
                lastName: "alastname",
                email: "a.b@c.com",
                role: Role.guest
            }
        })).toBe(false, "UserAndPasswordObj KO no pwd");

        expect(v.isUserAndPasswordObject({
            user: {
                id: ID,
                version: 12,
                username: "username",
                firstName: "afirstname",
                lastName: "alastname",
                email: "a.b@c.com",
                role: Role.guest
            },
            password: 123
        })).toBe(false, "UserAndPasswordObj KO numeric pwd");

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
        })).toBe(false, "UserAndPasswordObj KO no role");

    });

    it("isDatasetObject", () => {
        expect(v.isDatasetObject({
            id: ID,
            version: 12,
            userId: ID,
            name: "thisismyname",
            currencyCode: "EUR",
            additionalCurrencyCodes: ["USD", "JPY"]
        })).toBe(true, "DatasetObject OK ");

        expect(v.isDatasetObject({
            id: ID,
            version: 12,
            userId: ID,
            name: "thisismyname",
            currencyCode: "EUR2",
            additionalCurrencyCodes: ["USD", "JPY"]
        })).toBe(false, "DatasetObject KO invalid currency code");

        expect(v.isDatasetObject({
            id: ID,
            version: 12,
            userId: ID,
            currencyCode: "EUR",
            additionalCurrencyCodes: ["USD", "JPY"]
        })).toBe(false, "DatasetObject KO no name");

        expect(v.isDatasetObject({
            id: ID,
            version: 12,
            userId: ID,
            name: "thisismyname",
            additionalCurrencyCodes: ["USD", "JPY"]
        })).toBe(false, "DatasetObject KO no currency");

        expect(v.isDatasetObject({
            id: ID,
            version: 12,
            userId: ID,
            name: "thisismyname",
            currencyCode: "EUR"
        })).toBe(false, "DatasetObject KO no additionalCurrencyCodes");

        expect(v.isDatasetObject({
            id: ID,
            version: 12,
            name: "thisismyname",
            currencyCode: "EUR",
            additionalCurrencyCodes: []
        })).toBe(false, "DatasetObject KO no userId");

        expect(v.isDatasetObject({
            id: ID,
            version: 12,
            userId: ID,
            name: "thisismyname",
            currencyCode: "EUR",
            additionalCurrencyCodes: []
        })).toBe(true, "DatasetObject OK empty additionalCurrencyCodes");

        expect(v.isDatasetObject({
            id: ID,
            version: 12,
            userId: 12,
            name: "thisismyname",
            currencyCode: "EUR",
            additionalCurrencyCodes: []
        })).toBe(false, "DatasetObject KO userid not string");
    });

    it("isAccountObject", () => {
        // to be defined
    });

});