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

export const OBJECT_CLASS_PROPERTY_NAME: string = "_meta_class";

export abstract class ValidatedObject {
  public abstract isValid(): boolean;
  public toJSON(): any {
    if (OBJECT_CLASS_PROPERTY_NAME in this) {
      return this;
    } else {
      return Object.assign(
        {
          [OBJECT_CLASS_PROPERTY_NAME]: this.constructor.name
        },
        this);
    }
  }
}

export interface IValidatedObject extends ValidatedObject {}

export abstract class DomainObject extends ValidatedObject {
  constructor(
    public readonly id: string = uuid.v4(),
    public readonly version: number = 0
  ) {
    super();
  }
}
export interface IDomainObject extends DomainObject, IValidatedObject { }

export class ObjectReference extends DomainObject {

  constructor (id: string, version: number);
  constructor (obj: DomainObject);

  constructor(idOrObj: string | DomainObject, version?: number) {
    if (arguments.length === 1) {
      super((idOrObj as DomainObject).id, (idOrObj as DomainObject).version);
    } else {
      super(idOrObj as string, version);
    }
  }

  public static make(obj: any): ObjectReference {
    if (v.isObjectReference(obj)) {
      return new ObjectReference(obj.id, obj.version);
    } else {
      throw new Error("Invalid ObjectReference structure");
    }
  }

  public isValid(): boolean {
    return v.isObjectReference(this);
  }
}

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

export interface ICurrencyObject extends CurrencyObject { }

// Commodity and related hierarchy

export enum CommodityType {
  currencyrate,
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

export abstract class CommodityObject extends DomainObject {
    public lastPrice: BigJS;
    public lastPriceDate: Date;
    public readonly datasetId: string | null;

  constructor(
    id: string,
    version: number,
    dataset: string | DatasetObject | null,
    public readonly code: string,
    public readonly comType: CommodityType,
    public description: string,
    public readonly currencyCode: string,
    public readonly unit: string = DEFAULT_COMMODITY_UNIT,
    public readonly scale: number,
    public readonly quoteDrivers: string[],
    lastPrice: string | BigJS,
    lastPriceDate: Date | number,
    public lastPriceInfo: string
  ) {
    super(id, version);
    this.lastPrice = (typeof lastPrice === "string" ? Big(lastPrice as string) : lastPrice);
    this.lastPriceDate = (typeof lastPriceDate === "number" ? new Date(lastPriceDate as number) : lastPriceDate as Date);
    this.datasetId = (dataset == null ? null : (typeof dataset === "string" ? dataset as string : (dataset as DatasetObject).id));
  }

  public isValid(): boolean {
    return v.isCommodityObject(this, true);
  }
}

export interface ICommodityObject extends CommodityObject, IDomainObject { }

// Currency rate subtype
export const CURRENCY_RATE_UNIT: string = "xr";
export const CURRENCY_RATE_SCALE: number = 6;
export class CurrencyRateObject extends CommodityObject implements ICommodityObject, IDomainObject {

  constructor(
    id: string,
    version: number,
    code: string,
    description: string,
    currencyCode: string,
    quoteDrivers: string[],
    lastPrice: string | BigJS,
    lastPriceDate: Date,
    lastPriceInfo: string
  ) {
    super(
      id,
      version,
      null,           // currency rates are always shared across all datasets
      code,
      CommodityType.currencyrate,
      description,
      currencyCode,
      CURRENCY_RATE_UNIT,
      CURRENCY_RATE_SCALE,
      quoteDrivers,
      lastPrice,
      lastPriceDate,
      lastPriceInfo);
 }

  public static make(obj: any): CurrencyRateObject {
    if (v.isCurrencyRateObject(obj)) {
      return new CurrencyRateObject(
        obj.id,
        obj.version,
        obj.code,
        obj.description,
        obj.currencyCode,
        obj.quoteDrivers,
        obj.lastPrice,
        obj.lastPriceDate,
        obj.lastpriceInfo);
    } else {
        throw new Error("Invalid CurrencyRateObject parameters");
    }
  }

  public get aktSymbol(): string {
    return "";
  }

  public isValid(): boolean {
    return v.isCurrencyRateObject(this, true);
  }

}

export interface ISecurityObject extends SecurityObject, IDomainObject { }
// Security subtype

export enum SecurityType {
  bond,
  stock,
  fund
}

export const SECURITY_TYPE_NAMES: string[] = u.getEnumNames(SecurityType);
export const SECURITY_TYPE_VALUES: number[] = u.getEnumValues(SecurityType);
export const SECURITY_TYPE_NAMES_AND_VALUES: u.NameAndValue[] = u.getEnumNamesAndValues(SecurityType);

export class SecurityObject extends CommodityObject implements ICommodityObject, IDomainObject {

  constructor(
    id: string,
    version: number,
    dataset: string | DatasetObject | null,
    code: string,
    description: string,
    currencyCode: string,
    scale: number,
    public readonly secType: SecurityType,
    public readonly altSymbol: string,
    quoteDrivers: string[],
    lastPrice: string | BigJS,
    lastPriceDate: Date,
    lastPriceInfo: string
  ) {
    super(
      id,
      version,
      dataset,
      code,
      CommodityType.security,
      description,
      currencyCode,
      DEFAULT_COMMODITY_UNIT,
      scale,
      quoteDrivers,
      lastPrice,
      lastPriceDate,
      lastPriceInfo);
 }

  public static make(obj: any): SecurityObject {
    if (v.isSecurityObject(obj)) {
      return new SecurityObject(
        obj.id,
        obj.version,
        obj.dataset,
        obj.code,
        obj.description,
        obj.currencyCode,
        obj.scale,
        u.makeEnumIntValue(SecurityType, obj.secType),
        obj.altSymbol,
        obj.quoteDrivers,
        obj.lastPrice,
        obj.lastPriceDate,
        obj.lastPriceInfo);
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

export interface ISecurityObject extends SecurityObject, IDomainObject { }

// User and user role types
export enum Role {
  guest,
  user,
  administrator
}

export const ROLE_NAMES: string[] = u.getEnumNames(Role);
export const ROLE_VALUES: number[] = u.getEnumValues(Role);
export const ROLE_NAMES_AND_VALUES: u.NameAndValue[] = u.getEnumNamesAndValues(Role);

export class UserObject extends DomainObject {

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

export interface IUserObject extends UserObject, IDomainObject { }

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
export class DatasetObject extends DomainObject {
  public readonly userId: string;
  constructor(
    id: string,
    version: number,
    user: string | UserObject,
    public readonly name: string,
    public description: string,
    public readonly currencyCode: string,
    public additionalCurrencyCodes: string[]
  ) {
    super(id, version);
    this.userId = (typeof user === "string" ? user as string : (user as UserObject).id);
  }

  public static make(obj: any): DatasetObject {
    if (v.isDatasetObject(obj)) {
      return new DatasetObject(
        obj.id,
        obj.version,
        obj.user,
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
export interface IDatasetObject extends DatasetObject, IDomainObject { }

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
export class AccountObject extends DomainObject {
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
    this.qty = toAmount(qty);
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

export type BodyParser<U> = (body: any) => U;

export function getBodyData<T>(body: any, parser?: BodyParser<T>): T {
  return parser ? parser(body.data) : body.data as T;
}

export class RequestData<U> {
  constructor(
    public objref: DomainObject,
    public payload: U
  ) {}
}
export interface IRequestData<U> extends RequestData<U> { }

export class RequestDataV<U> {
  constructor(
    public objref: ObjectReference,
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
  constructor(objref: ObjectReference, payload: U) {
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

export function makeRequestBodyV<T extends ObjectReference, U> (ref: T, pl: U): RequestBodyV<U> {
  return makeBody<RequestDataV<U>>(new RequestDataV(ref, pl));
}

// Dynamic factory

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
  [AuthenticateDataObject.name]: AuthenticateDataObject,
  [ObjectReference.name]: ObjectReference
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
