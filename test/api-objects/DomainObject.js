"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * DomainObect
 */
const uuid = require("uuid");
const _1 = require(".");
class DomainObject extends _1.ValidatedObject {
    constructor(id = uuid.v4(), version = 0) {
        super();
        this.id = id;
        this.version = version;
    }
}
exports.DomainObject = DomainObject;
