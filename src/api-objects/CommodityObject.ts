/**
 * CommodityObject
 */

// Commodity and related hierarchy

import * as  Big from "big.js";
import BigJS = BigJsLibrary.BigJS;

import * as u from "../utils/utils";
import * as v from "../validation/validation";

import {
    DomainObject,
    IDomainObject
} from ".";

export enum CommodityType {
  currencyrate,
  security,
  commodity,
  home,
  car,
  mortgage,
  lineofcredit
}

export const COMMODITY_TYPE_NAMES: string[] = u.getEnumNames(CommodityType);
export const COMMODITY_TYPE_VALUES: number[] = u.getEnumValues(CommodityType);
export const COMMODITY_TYPE_NAMES_AND_VALUES: u.NameAndValue[] = u.getEnumNamesAndValues(CommodityType);

export const DEFAULT_COMMODITY_UNIT = "qty";

export abstract class CommodityObject extends DomainObject {
    public lastPrice: BigJS;
    public lastPriceDate: Date;

  constructor(
    id: string,
    version: number,
    public readonly datasetId: string,
    public readonly code: string,
    public readonly comType: CommodityType,
    public description: string,
    public readonly currencyCode: string,
    public readonly unit: string = DEFAULT_COMMODITY_UNIT,
    public readonly scale: number,
    public readonly quoteDrivers: string[],
    lastPrice: string | BigJS,
    lastPriceDate: Date | number,
    public lastPriceInfo: string
  ) {
    super(id, version);
    this.lastPrice = (typeof lastPrice === "string" ? Big(lastPrice as string) : lastPrice);
    this.lastPriceDate = (typeof lastPriceDate === "number" ? new Date(lastPriceDate as number) : lastPriceDate as Date);
  }

  public isValid(): boolean {
    return v.isCommodityObject(this, true);
  }
}

export interface ICommodityObject extends CommodityObject, IDomainObject { }
