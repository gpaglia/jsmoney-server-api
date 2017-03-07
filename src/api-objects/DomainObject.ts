/**
 * DomainObect
 */
import * as uuid from "uuid";

import { IValidatedObject, ValidatedObject } from ".";

export abstract class DomainObject extends ValidatedObject {
  constructor(
    public readonly id: string = uuid.v4(),
    public readonly version: number = 0
  ) {
    super();
  }
}
export interface IDomainObject extends DomainObject, IValidatedObject { }