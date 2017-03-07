/**
 * SecurityObject
 */
import * as  Big from "big.js";
import BigJS = BigJsLibrary.BigJS;

import * as u from "../utils/utils";
import * as v from "../validation/validation";

import {
    CommodityObject,
    CommodityType,
    DEFAULT_COMMODITY_UNIT,
    ICommodityObject,
    IDomainObject
} from ".";

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
    datasetId: string,
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
      datasetId,
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

  // tslint:disable-next-line:no-any
  public static make(obj: any): SecurityObject {
    if (v.isSecurityObject(obj)) {
      return new SecurityObject(
        obj.id,
        obj.version,
        obj.datasetId,
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
