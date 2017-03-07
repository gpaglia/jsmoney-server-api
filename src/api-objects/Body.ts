/**
 * Body
 */

// Requests and Responses

export class Body<T> {
  constructor(public data: T) {}
}

// tslint:disable-next-line:no-empty-interfaces
export interface IBody<T> extends Body<T> { }

export type BodyParser<T, U> = (data: T) => U;

export function getBodyDataAndConvert<T, U>(body: IBody<T>, parser: BodyParser<T, U>): U {
  return parser(body.data);
}

// tslint:disable-next-line:no-any
export function getBodyData<T>(body: IBody<any>, parser?: BodyParser<any, T>): T {
  return parser ? parser(body.data) : body.data as T;
}

export function makeBody<T>(obj: T): Body<T> {
  return new Body<T>(obj);
}
