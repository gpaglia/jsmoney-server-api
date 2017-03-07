/**
 * UserAndPasswordObject
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const v = require("../validation/validation");
const _1 = require(".");
class UserAndPasswordObject extends _1.ValidatedObject {
    constructor(user, password) {
        super();
        this.user = user;
        this.password = password;
    }
    // tslint:disable-next-line:no-any
    static make(obj) {
        if (v.isUserObject(obj.user) && v.isPassword(obj.password)) {
            return new UserAndPasswordObject(obj.user, obj.password);
        }
        else {
            throw new Error("Invalid UserAndPassword parameters");
        }
    }
    isValid() {
        return v.isUserAndPasswordObject(this);
    }
}
exports.UserAndPasswordObject = UserAndPasswordObject;
