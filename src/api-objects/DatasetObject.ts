/**
 * DatasetObject
 */

import * as v from "../validation/validation";

import {
    DomainObject,
    IDomainObject
} from ".";

// Dataset type
export class DatasetObject extends DomainObject {
  constructor(
    id: string,
    version: number,
    public readonly userId: string,
    public readonly name: string,
    public description: string,
    public readonly currencyCode: string,
    public additionalCurrencyCodes: string[]
  ) {
    super(id, version);
  }

  // tslint:disable-next-line:no-any
  public static make(obj: any): DatasetObject {
    if (v.isDatasetObject(obj)) {
      return new DatasetObject(
        obj.id,
        obj.version,
        obj.userId,
        obj.name,
        obj.description,
        obj.currencyCode,
        obj.additionalCurrencyCodes);
    } else {
      throw new Error("Invalid datasetObject parameters");
    }
  }

  public isValid(): boolean {
    return v.isDatasetObject(this, true);
  }

}
export interface IDatasetObject extends DatasetObject, IDomainObject { }