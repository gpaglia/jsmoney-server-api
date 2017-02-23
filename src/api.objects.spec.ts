
import * as api from './api.objects';
import * as uuid from 'uuid';
import * as Big from 'big.js';


describe("Factory", () => {
    const ID: string = uuid.v4();
    const F: (obj: any, clazz?: Function) => Object = api.apiObjectFactory;

    it("Create CurrencyObject", () => {
        let x = F({
            code: "EUR",
            iso: "123",
            description: "desc",
            scale: 3
        }, api.CurrencyObject) as api.CurrencyObject;
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
        }) as api.CurrencyObject;
        expect(x instanceof api.CurrencyObject).toBe(true);
        expect(x.code).toBe("EUR");

    });

    it("Create CredentialsObject", () => {
        let x = F({
            username: "username",
            password: "password"
        }, api.CredentialsObject) as api.CredentialsObject;
        expect(x instanceof api.CredentialsObject).toBe(true);
        expect(x.username).toBe("username");

    });

    it("Create CredentialsObject", () => {
        let x = F({
            _meta_class: "CredentialsObject",
            username: "username",
            password: "password"
        }) as api.CredentialsObject;
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
        }, api.SecurityObject) as api.SecurityObject;
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
        }) as api.SecurityObject;
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
        }, api.UserObject) as api.UserObject;
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
        }) as api.UserObject;
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
        }, api.UserAndPasswordObject) as api.UserAndPasswordObject;
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
        }) as api.UserAndPasswordObject;
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
        }, api.AuthenticateDataObject) as api.AuthenticateDataObject;
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
        }) as api.AuthenticateDataObject;
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
        }, api.DatasetObject) as api.DatasetObject;
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
        }) as api.DatasetObject;
        expect(x instanceof api.DatasetObject).toBe(true);
        expect(x.currencyCode).toBe("EUR");

    });


});