/**
 * RequestData
 */

import {
  DomainObject,
  ObjectReference
} from ".";

export class RequestData<U> {
  constructor(
    public objref: DomainObject,
    public payload: U
  ) {}
}

// tslint:disable-next-line:no-empty-interfaces
export interface IRequestData<U> extends RequestData<U> { }

// tslint:disable-next-line:max-classes-per-file
export class RequestDataV<U> {
  constructor(
    public objref: ObjectReference,
    public payload: U
  ) {}
}

// tslint:disable-next-line:no-empty-interfaces
export interface IRequestDataV<U> extends RequestDataV<U> { }