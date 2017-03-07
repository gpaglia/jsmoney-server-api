/**
 * UserObject
 */

import * as u from "../utils/utils";
import * as v from "../validation/validation";

import {
    DomainObject,
    IDomainObject
} from ".";

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

  // tslint:disable-next-line:no-any
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