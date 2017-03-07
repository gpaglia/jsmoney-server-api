/**
 * CurrencyObject
 */

import * as v from "../validation/validation";

import { ValidatedObject } from ".";

export class CurrencyObject extends ValidatedObject {
  constructor(
    public readonly code: string,
    public readonly iso: string,
    public readonly description: string,
    public readonly scale: number
  ) {
    super();
  }

  // tslint:disable-next-line:no-any
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

// tslint:disable-next-line:no-empty-interfaces
export interface ICurrencyObject extends CurrencyObject { }