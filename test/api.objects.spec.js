"use strict";
const api = require("./api.objects");
const uuid = require("uuid");
const Big = require("big.js");
describe("Factory", () => {
    const ID = uuid.v4();
    const F = api.apiObjectFactory;
    it("Create CurrencyObject", () => {
        let x = F({
            code: "EUR",
            iso: "123",
            description: "desc",
            scale: 3
        }, api.CurrencyObject);
        expect(x instanceof api.CurrencyObject).toBe(true);
        expect(x.code).toBe("EUR");
    });
    it("Create CurrencyObject", () => {
        let x = F({
            _meta_class: "CurrencyObject",
            code: "EUR",
            iso: "123",
            description: "desc",
            scale: 3
        });
        expect(x instanceof api.CurrencyObject).toBe(true);
        expect(x.code).toBe("EUR");
    });
    it("Create CredentialsObject", () => {
        let x = F({
            username: "username",
            password: "password"
        }, api.CredentialsObject);
        expect(x instanceof api.CredentialsObject).toBe(true);
        expect(x.username).toBe("username");
    });
    it("Create CredentialsObject", () => {
        let x = F({
            _meta_class: "CredentialsObject",
            username: "username",
            password: "password"
        });
        expect(x instanceof api.CredentialsObject).toBe(true);
        expect(x.username).toBe("username");
    });
    it("Create SecurityObject", () => {
        let x = F({
            id: ID,
            version: 12,
            code: "abcde",
            description: "desc",
            currencyCode: "EUR",
            scale: 3,
            secType: api.SecurityType.bond,
            comType: api.CommodityType.security,
            altSymbol: "abcd",
            quoteDrivers: ["abcd", "defg"],
            lastPrice: Big(123)
        }, api.SecurityObject);
        expect(x instanceof api.SecurityObject).toBe(true);
        expect(x.code).toBe("abcde");
    });
    it("Create SecurityObject", () => {
        let x = F({
            _meta_class: "SecurityObject",
            id: ID,
            version: 12,
            code: "abcde",
            description: "desc",
            currencyCode: "EUR",
            scale: 3,
            secType: api.SecurityType.bond,
            comType: api.CommodityType.security,
            altSymbol: "abcd",
            quoteDrivers: ["abcd", "defg"],
            lastPrice: Big(123)
        });
        expect(x instanceof api.SecurityObject).toBe(true);
        expect(x.code).toBe("abcde");
    });
    it("Create UserObject", () => {
        let x = F({
            id: ID,
            version: 12,
            username: "username",
            firstName: "aFirstName",
            lastName: "aLastName",
            email: "a.b@c.com",
            role: api.Role.user
        }, api.UserObject);
        expect(x instanceof api.UserObject).toBe(true);
        expect(x.username).toBe("username");
    });
    it("Create UserObject", () => {
        let x = F({
            _meta_class: "UserObject",
            id: ID,
            version: 12,
            username: "username",
            firstName: "aFirstName",
            lastName: "aLastName",
            email: "a.b@c.com",
            role: api.Role.user
        });
        expect(x instanceof api.UserObject).toBe(true);
        expect(x.username).toBe("username");
    });
    it("Create UserAndPasswordObject", () => {
        let x = F({
            user: {
                id: ID,
                version: 12,
                username: "username",
                firstName: "aFirstName",
                lastName: "aLastName",
                email: "a.b@c.com",
                role: api.Role.user
            },
            password: "password"
        }, api.UserAndPasswordObject);
        expect(x instanceof api.UserAndPasswordObject).toBe(true);
        expect(x.user.username).toBe("username");
    });
    it("Create UserAndPasswordObject", () => {
        let x = F({
            _meta_class: "UserAndPasswordObject",
            user: {
                id: ID,
                version: 12,
                username: "username",
                firstName: "aFirstName",
                lastName: "aLastName",
                email: "a.b@c.com",
                role: api.Role.user
            },
            password: "password"
        });
        expect(x instanceof api.UserAndPasswordObject).toBe(true);
        expect(x.user.username).toBe("username");
    });
    it("Create AuthenticateDataObject", () => {
        let x = F({
            user: {
                id: ID,
                version: 12,
                username: "username",
                firstName: "aFirstName",
                lastName: "aLastName",
                email: "a.b@c.com",
                role: api.Role.user
            },
            token: "astringtoken"
        }, api.AuthenticateDataObject);
        expect(x instanceof api.AuthenticateDataObject).toBe(true);
        expect(x.user.username).toBe("username");
    });
    it("Create AuthenticateDataObject", () => {
        let x = F({
            _meta_class: "AuthenticateDataObject",
            user: {
                id: ID,
                version: 12,
                username: "username",
                firstName: "aFirstName",
                lastName: "aLastName",
                email: "a.b@c.com",
                role: api.Role.user
            },
            token: "astringtoken"
        });
        expect(x instanceof api.AuthenticateDataObject).toBe(true);
        expect(x.user.username).toBe("username");
    });
    it("Create DatasetObject", () => {
        let x = F({
            id: ID,
            version: 12,
            userId: ID,
            name: "aname",
            description: "adescription",
            currencyCode: "EUR",
            additionalCurrencyCodes: ["USD", "CAD"]
        }, api.DatasetObject);
        expect(x instanceof api.DatasetObject).toBe(true);
        expect(x.currencyCode).toBe("EUR");
    });
    it("Create DatasetObject", () => {
        let x = F({
            _meta_class: "DatasetObject",
            id: ID,
            version: 12,
            userId: ID,
            name: "aname",
            description: "adescription",
            currencyCode: "EUR",
            additionalCurrencyCodes: ["USD", "CAD"]
        });
        expect(x instanceof api.DatasetObject).toBe(true);
        expect(x.currencyCode).toBe("EUR");
    });
});
