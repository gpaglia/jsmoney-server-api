/**
 * Api objects
 */

/* tslint:disable:no-any max-classes-per-file no-empty-interfaces */

import * as uuid from "uuid";

import * as  Big from "big.js";
import BigJS = BigJsLibrary.BigJS;

import * as u from "./utils";
import * as v from "./validation";

// Util functions
export function toAmount(v: string | BigJS): BigJS {
    return (v instanceof Big ? v as BigJS : Big(v as string));
}

// Root types

export abstract class ValidatedObject {
  public abstract isValid(): boolean;
}
export interface IValidatedObject extends ValidatedObject {}

export abstract class DomainObject extends ValidatedObject {
  constructor(public readonly id: string = uuid.v4()) {
    super();
  }
}
export interface IDomainObject extends DomainObject, IValidatedObject { }

// Versioned object type
export abstract class VersionedObject extends DomainObject {
  constructor(id: string, public readonly version: number = 0) {
    super(id);
  }
}
export interface IVersionedObject extends IDomainObject, IValidatedObject, VersionedObject { }

// Credentials type
export class CredentialsObject extends ValidatedObject {
  constructor(
    public username: string,
    public password: string
  ) {
    super();
  }

  public static make(obj: any): CredentialsObject {
    if (v.isCredentialsObject(obj)) {
      return new CredentialsObject(obj.username, obj.password);
    } else {
      throw new Error("Invalid username or password structure");
    }
  }

  public isValid(): boolean {
    return v.isCredentialsObject(this);
  }

}
export interface ICredentialsObject extends CredentialsObject { }

// Currency type

export class CurrencyObject extends ValidatedObject {
  constructor(
    public readonly code: string,
    public readonly iso: string,
    public readonly description: string,
    public readonly scale: number
  ) {
    super();
  }

  public static make(obj: any): CurrencyObject {
    if (v.isCurrencyObject(obj)) {
      return new CurrencyObject(obj.code, obj.iso, obj.description, obj.scale);
    } else {
      throw new Error("Invalid CurrencyObject parameters");
    }
  }

  public isValid(): boolean {
    return v.isCurrencyObject(this);
  }

}

export interface ICurrencyObject extends CurrencyObject, IVersionedObject { }

// Commodity and related hierarchy

export enum CommodityType {
  currency,
  security,
  commodity,
  home,
  car,
  mortgage,
  lineofcredit
}

export const COMMODITY_TYPE_NAMES: string[] = u.getEnumNames(CommodityType);
export const COMMODITY_TYPE_VALUES: number[] = u.getEnumValues(CommodityType);
export const COMMODITY_TYPE_NAMES_AND_VALUES: u.NameAndValue[] = u.getEnumNamesAndValues(CommodityType);

export const DEFAULT_COMMODITY_UNIT = "qty";

export abstract class CommodityObject extends VersionedObject {

  constructor(
    id: string,
    version: number,
    public readonly code: string,
    public readonly comType: CommodityType,
    public description: string,
    public readonly currencyCode: string,
    public readonly unit: string = DEFAULT_COMMODITY_UNIT,
    public readonly scale: number
  ) {
    super(id, version);
  }

  public isValid(): boolean {
    return v.isCommodityObject(this, true);
  }
}

export interface ICommodityObject extends CommodityObject, IVersionedObject { }

export enum SecurityType {
  bond,
  stock,
  fund
}

export const SECURITY_TYPE_NAMES: string[] = u.getEnumNames(SecurityType);
export const SECURITY_TYPE_VALUES: number[] = u.getEnumValues(SecurityType);
export const SECURITY_TYPE_NAMES_AND_VALUES: u.NameAndValue[] = u.getEnumNamesAndValues(SecurityType);

export class SecurityObject extends CommodityObject implements ICommodityObject, IVersionedObject {

  public lastPrice: BigJS;

  constructor(
    id: string,
    version: number,
    code: string,
    description: string,
    currencyCode: string,
    scale: number,
    public readonly secType: SecurityType,
    public readonly altSymbol: string,
    public readonly quoteDrivers: string[],
    lastPrice: string | BigJS
  ) {
    super(id, version, code, CommodityType.security, description, currencyCode, DEFAULT_COMMODITY_UNIT, scale);
    this.lastPrice = (typeof lastPrice === "string" ? Big(lastPrice as string) : lastPrice);
 }

  public static make(obj: any): SecurityObject {
    if (v.isSecurityObject(obj)) {
      return new SecurityObject(
        obj.id,
        obj.version,
        obj.code,
        obj.description,
        obj.currencyCode,
        obj.scale,
        u.makeEnumIntValue(SecurityType, obj.secType),
        obj.altSymbol,
        obj.quoteDrivers,
        obj.lastPrice);
    } else {
        throw new Error("Invalid SecurityObject parameters");
    }
  }

  public get lastPriceStr(): string {
    return this.lastPrice.toString();
  }

  public set lastPriceStr(value: string) {
    this.lastPrice = Big(value);
  }

  public isValid(): boolean {
    return v.isSecurityObject(this, true);
  }

}

export interface ISecurityObject extends SecurityObject, IVersionedObject { }

// User and user role types
export enum Role {
  guest,
  user,
  administrator
}

export const ROLE_NAMES: string[] = u.getEnumNames(Role);
export const ROLE_VALUES: number[] = u.getEnumValues(Role);
export const ROLE_NAMES_AND_VALUES: u.NameAndValue[] = u.getEnumNamesAndValues(Role);

export class UserObject extends VersionedObject {

  constructor(
    id: string,
    version: number,
    public readonly username: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public readonly role: Role
  ) {
    super(id, version);
  }

  public static make(obj: any): UserObject {
    if (v.isUserObject(obj)) {
      return new UserObject(
        obj.id,
        obj.version,
        obj.username,
        obj.firstName,
        obj.lastName,
        obj.email,
        u.makeEnumIntValue(Role, obj.role));
    } else {
      throw new Error("Invalid UserObject parameters");
    }
  }

  public isValid(): boolean {
    return v.isUserObject(this, true);
  }

}

export interface IUserObject extends UserObject, IVersionedObject { }

export class UserAndPasswordObject extends ValidatedObject {
  constructor(
    public user: IUserObject,
    public readonly password: string
  ) {
    super();
  }

  public static make(obj: any): UserAndPasswordObject {
    if (v.isUserObject(obj.user) && v.isPassword(obj.password)) {
      return new UserAndPasswordObject(obj.user, obj.password);
    } else {
      throw new Error("Invalid UserAndPassword parameters");
    }
  }

  public isValid(): boolean {
    return v.isUserAndPasswordObject(this);
  }

}
export interface IUserAndPasswordObject extends UserAndPasswordObject { }

export class AuthenticateDataObject {
  constructor(
    public user: UserObject,
    public token: string
  ) { }

  public static make(obj: any): AuthenticateDataObject {
    if (v.isAuthenticateDataObject(obj)) {
      return new AuthenticateDataObject(UserObject.make(obj.user), obj.token);
    } else {
      throw new Error("Invalid AUthenticateData parameters");
    }
  }

  public isValid(): boolean {
    return v.isAuthenticateDataObject(this);
  }

}
export class IAuthenticateDataObject extends AuthenticateDataObject {}

// Dataset type
export class DatasetObject extends VersionedObject {
  constructor(
    id: string,
    version: number,
    public userId: string,
    public readonly name: string,
    public description: string,
    public readonly currencyCode: string,
    public additionalCurrencyCodes: string[]
  ) {
    super(id, version);
  }

  public static make(obj: any): DatasetObject {
    if (v.isDatasetObject(obj)) {
      return new DatasetObject(
        obj.id,
        obj.version,
        obj.userId,
        obj.name,
        obj.description,
        obj.currencyCode,
        obj.additionalCurrencyCodes);
    } else {
      throw new Error("Invalid datasetObject parameters");
    }
  }

  public isValid(): boolean {
    return v.isDatasetObject(this, true);
  }

}
export interface IDatasetObject extends DatasetObject, IVersionedObject { }

// Internal precision in calculations
export function internalScale(commodity: ICommodityObject): number {
  return commodity.scale + 4;
}

// Account type
export enum AccountType {
  cash,
  investment,
  cost,
  revenue,
  asset,
  liability,
  other
}

export const ACCOUNT_TYPE_NAMES: string[] = u.getEnumNames(AccountType);
export const ACCOUNT_TYPE_VALUES: number[] = u.getEnumValues(AccountType);
export const ACCOUNT_TYPE_NAMES_AND_VALUES: u.NameAndValue[] = u.getEnumNamesAndValues(AccountType);

// Account
export class AccountObject extends VersionedObject {
  public qty: BigJS;

  constructor(
    id: string,
    version: number,
    public readonly name: string,
    public readonly accType: AccountType,
    public description: string,
    public readonly currencyCode: string,
    qty: BigJS | string,
    public readonly scale: number
  ) {
    super(id, version);
    this.qty = toAmount(this.qty);
  }

  public static make(obj: any): AccountObject {
    if (v.isAccountObject(obj)) {
      return new AccountObject(
        obj.id,
        obj.version,
        obj.name,
        u.makeEnumIntValue(AccountType, obj.accType),
        obj.description,
        obj.currencyCode,
        obj.qty,
        obj.scale);
    } else {
      throw new Error("Invalid AccountObject parameters");
    }
  }

  public isValid(): boolean {
    return v.isAccountObject(this, true);
  }

}

// ***
// Api messages and other stuff
// ***

export const BEARER = "JWT";

// Api error format
export interface IApiError extends Error {
  readonly status: number;
  readonly otherInfo?: string;
}

// Requests and Responses

export class Body<T> {
  constructor(public data: T) {}
}
export interface IBody<T> extends Body<T> {
}

// tslint:disable-next-line:no-any
export type BodyParser<U> = (body: any) => U;

export class RequestData<U> {
  constructor(
    public objref: DomainObject,
    public payload: U
  ) {}
}
export interface IRequestData<U> extends RequestData<U> { }

export class RequestDataV<U> {
  constructor(
    public objref: VersionedObject,
    public payload: U
  ) {}
}
export interface IRequestDataV<U> extends RequestDataV<U> { }

export class RequestBody<U> extends Body<RequestData<U>> {
  constructor(objref: DomainObject, payload: U) {
    super(new RequestData<U>(objref, payload));
  }
}
export interface IRequestBody<U> extends RequestBody<U>, IBody<IRequestData<U>> {}

export class RequestBodyV<U> extends Body<RequestDataV<U>> {
  constructor(objref: VersionedObject, payload: U) {
    super(new RequestDataV<U>(objref, payload));
  }
}
export interface IRequestBodyV<U> extends RequestDataV<U>, IBody<IRequestDataV<U>> {}

export function makeBody<T>(obj: T): Body<T> {
  return new Body<T>(obj);
}

export function makeRequestBody<T extends DomainObject, U> (ref: T, pl: U): RequestBody<U> {
  return makeBody<RequestData<U>>(new RequestData<U>(ref, pl));
}

export function makeRequestBodyV<T extends VersionedObject, U> (ref: T, pl: U): RequestBodyV<U> {
  return makeBody<RequestDataV<U>>(new RequestDataV(ref, pl));
}

// Dynamic factory

export const OBJECT_CLASS_PROPERTY_NAME: string = "_meta_class";

interface IStaticFactory {
  make(obj: any): Object;
}

const apidb: {[name: string]: IStaticFactory} = {
  [CredentialsObject.name]: CredentialsObject,
  [CurrencyObject.name]: CurrencyObject,
  [SecurityObject.name]: SecurityObject,
  [UserObject.name]: UserObject,
  [UserAndPasswordObject.name]: UserAndPasswordObject,
  [DatasetObject.name]: DatasetObject,
  [AccountObject.name]: AccountObject,
  [AuthenticateDataObject.name]: AuthenticateDataObject
};

export function apiObjectFactory(obj: any, clazz?: Function): Object {
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

