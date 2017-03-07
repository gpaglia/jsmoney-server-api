/**
 * ObjectReference
 */
import * as v from "../validation/validation";

import {
    DomainObject
} from ".";

export class ObjectReference extends DomainObject {

  constructor (id: string, version: number);
  constructor (obj: DomainObject);

  constructor(idOrObj: string | DomainObject, version?: number) {
    if (arguments.length === 1) {
      super((idOrObj as DomainObject).id, (idOrObj as DomainObject).version);
    } else {
      super(idOrObj as string, version);
    }
  }

  // tslint:disable-next-line:no-any
  public static make(obj: any): ObjectReference {
    if (v.isObjectReference(obj)) {
      return new ObjectReference(obj.id, obj.version);
    } else {
      throw new Error("Invalid ObjectReference structure");
    }
  }

  public isValid(): boolean {
    return v.isObjectReference(this);
  }
}