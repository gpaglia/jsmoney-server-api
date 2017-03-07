/**
 * CredentialsObject
 */

import * as v from "../validation/validation";

import { ValidatedObject } from ".";

export class CredentialsObject extends ValidatedObject {
  constructor(
    public username: string,
    public password: string
  ) {
    super();
  }

  // tslint:disable-next-line:no-any
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

// tslint:disable-next-line:no-empty-interfaces
export interface ICredentialsObject extends CredentialsObject { }