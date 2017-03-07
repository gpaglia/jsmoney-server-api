/**
 * UserObject
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const u = require("../utils/utils");
const v = require("../validation/validation");
const _1 = require(".");
// User and user role types
var Role;
(function (Role) {
    Role[Role["guest"] = 0] = "guest";
    Role[Role["user"] = 1] = "user";
    Role[Role["administrator"] = 2] = "administrator";
})(Role = exports.Role || (exports.Role = {}));
exports.ROLE_NAMES = u.getEnumNames(Role);
exports.ROLE_VALUES = u.getEnumValues(Role);
exports.ROLE_NAMES_AND_VALUES = u.getEnumNamesAndValues(Role);
class UserObject extends _1.DomainObject {
    constructor(id, version, username, firstName, lastName, email, role) {
        super(id, version);
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.role = role;
    }
    // tslint:disable-next-line:no-any
    static make(obj) {
        if (v.isUserObject(obj)) {
            return new UserObject(obj.id, obj.version, obj.username, obj.firstName, obj.lastName, obj.email, u.makeEnumIntValue(Role, obj.role));
        }
        else {
            throw new Error("Invalid UserObject parameters");
        }
    }
    isValid() {
        return v.isUserObject(this, true);
    }
}
exports.UserObject = UserObject;
