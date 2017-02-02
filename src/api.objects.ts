/**
 * Api objects
 */

import "big.js";
import BigJS = BigJsLibrary.BigJS;

// Root type
export interface IDomainObject {
  readonly id: string;
}

// Versioned object type
export interface IVersionedObject extends IDomainObject {
  readonly version: number;
}

// Credentials type
export interface ICredentialsObject {
  username: string;
  password: string;
}

// Currency type
export interface ICurrencyObject {
  readonly code: string;
  readonly iso: string;
  readonly description: string;
  readonly scale: number;
}

// User and user role types
export interface IUserObject extends IVersionedObject {

  readonly username: string;
  firstName?: string;
  lastName?: string;
  readonly email: string;
  readonly role: Role;
}

export interface IUserAndPasswordObject {
  user: IUserObject;
  readonly password: string;
}

export enum Role {
  guest,
  user,
  administrator
}

// Dataset type
export interface IDatasetObject extends IVersionedObject {
  readonly name: string;
  description: string;
  readonly currency: string;
  additionalCurrencies: string[];
}

// Account type
export interface IAccountObject extends IVersionedObject {
  readonly name: string;
  readonly accType: AccountType;
  description: string;
  readonly currency: string;
  readonly balance: BigJS;
}

export enum AccountType {
  cash,
  investment,
  cost,
  revenue,
  asset,
  liability,
  other
}

// ***
// Api messages and other stuff
// ***

export const BEARER = "JWT";

// Requests and Responses

// Datasets

export interface IErrorRes {
  info: string | {};
}

export interface IAuthenticateRes {
  data: {
    user: IUserObject,
    token: string
  };
}

export interface IGetDatasetsRes {
  data: IDatasetObject[];
}

export interface ICreateDatasetReq {
  data: IDatasetObject;
}

export interface ICreateDatasetRes {
  data: IDatasetObject;
}
