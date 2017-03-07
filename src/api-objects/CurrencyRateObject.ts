/**
 * CurrencyRateObject
 */
import BigJS = BigJsLibrary.BigJS;

import * as v from "../validation/validation";

import {
    CommodityObject,
    CommodityType,
    IDomainObject
} from ".";

// Currency rate subtype
export const CURRENCY_RATE_UNIT: string = "xr";
export const CURRENCY_RATE_SCALE: number = 6;
export class CurrencyRateObject extends CommodityObject {

  constructor(
    id: string,
    version: number,
    datasetId: string,
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
      datasetId,
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

  // tslint:disable-next-line:no-any
  public static make(obj: any): CurrencyRateObject {
    if (v.isCurrencyRateObject(obj)) {
      return new CurrencyRateObject(
        obj.id,
        obj.version,
        obj.datasetId,
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

  public get altSymbol(): string {
    return "";
  }

  public isValid(): boolean {
    return v.isCurrencyRateObject(this, true);
  }

}

export interface ICurrencyRateObject extends CurrencyRateObject, IDomainObject { }
