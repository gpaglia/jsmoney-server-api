/**
 * ValidatedObject
 */

export const OBJECT_CLASS_PROPERTY_NAME: string = "_meta_class";

export abstract class ValidatedObject {
  public abstract isValid(): boolean;
  // tslint:disable-next-line:no-any
  public toJSON(): any {
    if (OBJECT_CLASS_PROPERTY_NAME in this) {
      return this;
    } else {
      return Object.assign(
        {
          [OBJECT_CLASS_PROPERTY_NAME]: this.constructor.name
        },
        this);
    }
  }
}

// tslint:disable-next-line:no-empty-interfaces
export interface IValidatedObject extends ValidatedObject {}
