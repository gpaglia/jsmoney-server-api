/**
 * AuthenticateDataObject
 */

import * as v from "../validation/validation";

import {
    IValidatedObject,
    UserObject
} from ".";

export class AuthenticateDataObject {
  constructor(
    public user: UserObject,
    public token: string
  ) { }

  // tslint:disable-next-line:no-any
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

export interface IAuthenticateDataObject extends AuthenticateDataObject, IValidatedObject {}
