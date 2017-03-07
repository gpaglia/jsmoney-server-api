/**
 * AccountObject
 */

import BigJS = BigJsLibrary.BigJS;

import * as u from "../utils/utils";
import * as v from "../validation/validation";

import {
    DomainObject,
    IDomainObject
} from ".";

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
    this.qty = u.toAmount(qty);
  }

  // tslint:disable-next-line:no-any
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

export interface IAccountObject extends AccountObject, IDomainObject {}
