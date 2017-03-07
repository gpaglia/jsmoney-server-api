"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ObjectReference
 */
const v = require("../validation/validation");
const _1 = require(".");
class ObjectReference extends _1.DomainObject {
    constructor(idOrObj, version) {
        if (arguments.length === 1) {
            super(idOrObj.id, idOrObj.version);
        }
        else {
            super(idOrObj, version);
        }
    }
    // tslint:disable-next-line:no-any
    static make(obj) {
        if (v.isObjectReference(obj)) {
            return new ObjectReference(obj.id, obj.version);
        }
        else {
            throw new Error("Invalid ObjectReference structure");
        }
    }
    isValid() {
        return v.isObjectReference(this);
    }
}
exports.ObjectReference = ObjectReference;
