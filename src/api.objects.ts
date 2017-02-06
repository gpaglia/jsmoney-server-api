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

// Api error format
export interface IApiError extends Error {
  readonly status: number;
  readonly otherInfo?: string;
}

// Requests and Responses

export interface IBody<T> {
  data: T;
}

export function makeBody<T>(obj: T): IBody<T> {
  return { data: obj } as IBody<T>;
}

export interface IAuthenticateData {
  user: IUserObject;
  token: string;
}
