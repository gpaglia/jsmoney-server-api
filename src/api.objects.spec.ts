
/**
 * API objects - jasmine specs
 */
import * as Big from "big.js";
import * as uuid from "uuid";
import * as api from "./api.objects";
import * as u from "./utils";

/* tslint:disable:no-any */

describe("Stringify", () => {
    it("Stringify", () => {
        const ID: string = uuid.v4();
        const obj = {
            id: ID,
            version: 12,
            user: {
                id: ID,
                version: 12,
                username: "username",
                firstName: "afirstname",
                lastName: "alastname",
                email: "a.b@c.com",
                role: api.Role.guest
            },
            name: "myname",
            description: "mydesc",
            currencyCode: "EUR",
            additionalCurrencyCodes: ["USD", "JPY"]
        };
        const d = api.DatasetObject.make(obj);

        const s1 = JSON.stringify(d);
        const x1 = JSON.parse(s1);
        const df = Object.assign({ [api.OBJECT_CLASS_PROPERTY_NAME]: "DatasetObject" }, d);
        const s2 = JSON.stringify(df);
        const x2 = JSON.parse(s2);

        expect(u.deepEqualObj(x1, x2)).toBe(true);

    });
});

describe("Factory", () => {
    const ID: string = uuid.v4();
    const F: (obj: any, clazz?: Function) => Object = api.apiObjectFactory;

    it("Create CurrencyObject", () => {
        const x = F(
            {
                code: "EUR",
                iso: "123",
                description: "desc",
                scale: 3
            },
            api.CurrencyObject) as api.CurrencyObject;
        expect(x instanceof api.CurrencyObject).toBe(true);
        expect(x.code).toBe("EUR");

    });

    it("Create CurrencyObject", () => {
        const x = F({
            _meta_class: "CurrencyObject",
            code: "EUR",
            iso: "123",
            description: "desc",
            scale: 3
        }) as api.CurrencyObject;
        expect(x instanceof api.CurrencyObject).toBe(true);
        expect(x.code).toBe("EUR");

    });

    it("Create CredentialsObject", () => {
        const x = F(
            {
                username: "username",
                password: "password"
            },
            api.CredentialsObject) as api.CredentialsObject;
        expect(x instanceof api.CredentialsObject).toBe(true);
        expect(x.username).toBe("username");

    });

    it("Create CredentialsObject", () => {
        const x = F({
            _meta_class: "CredentialsObject",
            username: "username",
            password: "password"
        }) as api.CredentialsObject;
        expect(x instanceof api.CredentialsObject).toBe(true);
        expect(x.username).toBe("username");

    });

    it("Create SecurityObject", () => {
        const x = F(
            {
                id: ID,
                version: 12,
                dataset: ID,
                code: "abcde",
                description: "desc",
                currencyCode: "EUR",
                scale: 3,
                secType: api.SecurityType.bond,
                comType: api.CommodityType.security,
                altSymbol: "abcd",
                quoteDrivers: ["abcd", "defg"],
                lastPrice: Big(123),
                lastPriceDate: new Date(),
                lastPriceInfo: "Info"
            },
            api.SecurityObject) as api.SecurityObject;
        expect(x instanceof api.SecurityObject).toBe(true);
        expect(x.code).toBe("abcde");

    });

    it("Create SecurityObject", () => {
        const x = F({
            _meta_class: "SecurityObject",
            id: ID,
            version: 12,
            dataset: ID,
            code: "abcde",
            description: "desc",
            currencyCode: "EUR",
            scale: 3,
            secType: api.SecurityType.bond,
            comType: api.CommodityType.security,
            altSymbol: "abcd",
            quoteDrivers: ["abcd", "defg"],
            lastPrice: Big(123),
            lastPriceDate: new Date(),
            lastPriceInfo: "Info"
        }) as api.SecurityObject;
        expect(x instanceof api.SecurityObject).toBe(true);
        expect(x.code).toBe("abcde");

    });

    it("Create UserObject", () => {
        const x = F(
            {
                id: ID,
                version: 12,
                username: "username",
                firstName: "aFirstName",
                lastName: "aLastName",
                email: "a.b@c.com",
                role: api.Role.user
            },
            api.UserObject) as api.UserObject;
        expect(x instanceof api.UserObject).toBe(true);
        expect(x.username).toBe("username");

    });

    it("Create UserObject", () => {
        const x = F({
            _meta_class: "UserObject",
            id: ID,
            version: 12,
            username: "username",
            firstName: "aFirstName",
            lastName: "aLastName",
            email: "a.b@c.com",
            role: api.Role.user
        }) as api.UserObject;
        expect(x instanceof api.UserObject).toBe(true);
        expect(x.username).toBe("username");

    });

    it("Create UserAndPasswordObject", () => {
        const x = F(
            {
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
            },
            api.UserAndPasswordObject) as api.UserAndPasswordObject;
        expect(x instanceof api.UserAndPasswordObject).toBe(true);
        expect(x.user.username).toBe("username");

    });

    it("Create UserAndPasswordObject", () => {
        const x = F({
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
        }) as api.UserAndPasswordObject;
        expect(x instanceof api.UserAndPasswordObject).toBe(true);
        expect(x.user.username).toBe("username");

    });

    it("Create AuthenticateDataObject", () => {
        const x = F(
            {
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
            },
            api.AuthenticateDataObject) as api.AuthenticateDataObject;
        expect(x instanceof api.AuthenticateDataObject).toBe(true);
        expect(x.user.username).toBe("username");

    });

    it("Create AuthenticateDataObject", () => {
        const x = F({
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
        }) as api.AuthenticateDataObject;
        expect(x instanceof api.AuthenticateDataObject).toBe(true);
        expect(x.user.username).toBe("username");

    });

    it("Create DatasetObject", () => {
        const x = F(
            {
                id: ID,
                version: 12,
                user: {
                    id: ID,
                    version: 12,
                    username: "username",
                    firstName: "afirstname",
                    lastName: "alastname",
                    email: "a.b@c.com",
                    role: api.Role.guest
                },
                name: "aname",
                description: "adescription",
                currencyCode: "EUR",
                additionalCurrencyCodes: ["USD", "CAD"]
            },
            api.DatasetObject) as api.DatasetObject;
        expect(x instanceof api.DatasetObject).toBe(true);
        expect(x.currencyCode).toBe("EUR");

    });

    it("Create DatasetObject", () => {
        const x = F({
            _meta_class: "DatasetObject",
            id: ID,
            version: 12,
            user: ID,
            name: "aname",
            description: "adescription",
            currencyCode: "EUR",
            additionalCurrencyCodes: ["USD", "CAD"]
        }) as api.DatasetObject;
        expect(x instanceof api.DatasetObject).toBe(true);
        expect(x.currencyCode).toBe("EUR");

    });

});