/**
 * UserAndPasswordObject
 */

import * as v from "../validation/validation";

import {
    IUserObject,
    IValidatedObject,
    ValidatedObject
} from ".";

export class UserAndPasswordObject extends ValidatedObject {
  constructor(
    public user: IUserObject,
    public readonly password: string
  ) {
    super();
  }

  // tslint:disable-next-line:no-any
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

export interface IUserAndPasswordObject extends UserAndPasswordObject, IValidatedObject { }