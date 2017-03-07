/**
 * CredentialsObject
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const v = require("../validation/validation");
const _1 = require(".");
class CredentialsObject extends _1.ValidatedObject {
    constructor(username, password) {
        super();
        this.username = username;
        this.password = password;
    }
    // tslint:disable-next-line:no-any
    static make(obj) {
        if (v.isCredentialsObject(obj)) {
            return new CredentialsObject(obj.username, obj.password);
        }
        else {
            throw new Error("Invalid username or password structure");
        }
    }
    isValid() {
        return v.isCredentialsObject(this);
    }
}
exports.CredentialsObject = CredentialsObject;
