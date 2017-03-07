/**
 * ObjectFactory
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const apidb = {
    [_1.AccountObject.name]: _1.AccountObject,
    [_1.AuthenticateDataObject.name]: _1.AuthenticateDataObject,
    [_1.CredentialsObject.name]: _1.CredentialsObject,
    [_1.CurrencyObject.name]: _1.CurrencyObject,
    [_1.CurrencyRateObject.name]: _1.CurrencyRateObject,
    [_1.DatasetObject.name]: _1.DatasetObject,
    [_1.ObjectReference.name]: _1.ObjectReference,
    [_1.SecurityObject.name]: _1.SecurityObject,
    [_1.UserAndPasswordObject.name]: _1.UserAndPasswordObject,
    [_1.UserObject.name]: _1.UserObject
};
// tslint:disable-next-line:no-stateless-class
class ObjectFactory {
    // tslint:disable-next-line:no-any
    static apiObjectFactory(obj, clazz) {
        const name = clazz ? clazz.name : obj[_1.OBJECT_CLASS_PROPERTY_NAME];
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
}
exports.ObjectFactory = ObjectFactory;
