/**
 * RequestBody
 */

import {
    Body,
    DomainObject,
    IBody,
    IRequestData,
    IRequestDataV,
    makeBody,
    ObjectReference,
    RequestData,
    RequestDataV
} from ".";

export class RequestBody<U> extends Body<RequestData<U>> {
  constructor(objref: DomainObject, payload: U) {
    super(new RequestData<U>(objref, payload));
  }
}
export interface IRequestBody<U> extends RequestBody<U>, IBody<IRequestData<U>> {}

// tslint:disable-next-line:max-classes-per-file
export class RequestBodyV<U> extends Body<RequestDataV<U>> {
  constructor(objref: ObjectReference, payload: U) {
    super(new RequestDataV<U>(objref, payload));
  }
}

export interface IRequestBodyV<U> extends RequestDataV<U>, IBody<IRequestDataV<U>> {}

export function makeRequestBody<T extends DomainObject, U> (ref: T, pl: U): RequestBody<U> {
  return makeBody<RequestData<U>>(new RequestData<U>(ref, pl));
}

export function makeRequestBodyV<T extends ObjectReference, U> (ref: T, pl: U): RequestBodyV<U> {
  return makeBody<RequestDataV<U>>(new RequestDataV(ref, pl));
}
