/**
 * ValidatedObject
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OBJECT_CLASS_PROPERTY_NAME = "_meta_class";
class ValidatedObject {
    // tslint:disable-next-line:no-any
    toJSON() {
        if (exports.OBJECT_CLASS_PROPERTY_NAME in this) {
            return this;
        }
        else {
            return Object.assign({
                [exports.OBJECT_CLASS_PROPERTY_NAME]: this.constructor.name
            }, this);
        }
    }
}
exports.ValidatedObject = ValidatedObject;
