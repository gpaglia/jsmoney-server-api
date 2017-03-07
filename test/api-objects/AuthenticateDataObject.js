/**
 * AuthenticateDataObject
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const v = require("../validation/validation");
const _1 = require(".");
class AuthenticateDataObject {
    constructor(user, token) {
        this.user = user;
        this.token = token;
    }
    // tslint:disable-next-line:no-any
    static make(obj) {
        if (v.isAuthenticateDataObject(obj)) {
            return new AuthenticateDataObject(_1.UserObject.make(obj.user), obj.token);
        }
        else {
            throw new Error("Invalid AUthenticateData parameters");
        }
    }
    isValid() {
        return v.isAuthenticateDataObject(this);
    }
}
exports.AuthenticateDataObject = AuthenticateDataObject;
