/**
 * ObjectFactory
 */

import {
    AccountObject,
    AuthenticateDataObject,
    CredentialsObject,
    CurrencyObject,
    CurrencyRateObject,
    DatasetObject,
    OBJECT_CLASS_PROPERTY_NAME,
    ObjectReference,
    SecurityObject,
    UserAndPasswordObject,
    UserObject
} from ".";

interface IStaticFactory {
    // tslint:disable-next-line:no-any
    make(obj: any): Object;
}

const apidb: { [name: string]: IStaticFactory } = {
    [AccountObject.name]: AccountObject,
    [AuthenticateDataObject.name]: AuthenticateDataObject,
    [CredentialsObject.name]: CredentialsObject,
    [CurrencyObject.name]: CurrencyObject,
    [CurrencyRateObject.name]: CurrencyRateObject,
    [DatasetObject.name]: DatasetObject,
    [ObjectReference.name]: ObjectReference,
    [SecurityObject.name]: SecurityObject,
    [UserAndPasswordObject.name]: UserAndPasswordObject,
    [UserObject.name]: UserObject
};

// tslint:disable-next-line:no-stateless-class
export class ObjectFactory {
    // tslint:disable-next-line:no-any
    public static apiObjectFactory(obj: any, clazz ?: Function): Object {
        const name = clazz ? clazz.name : obj[OBJECT_CLASS_PROPERTY_NAME];
        if (name == null) {
            return undefined;
        } else {
            const c: IStaticFactory = apidb[name];
            if (c == null) {
                return undefined;
            } else {
                return c.make(obj);
            }
        }
    }
}
