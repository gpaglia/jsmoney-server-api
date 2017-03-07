/**
 * RequestBody
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class RequestBody extends _1.Body {
    constructor(objref, payload) {
        super(new _1.RequestData(objref, payload));
    }
}
exports.RequestBody = RequestBody;
// tslint:disable-next-line:max-classes-per-file
class RequestBodyV extends _1.Body {
    constructor(objref, payload) {
        super(new _1.RequestDataV(objref, payload));
    }
}
exports.RequestBodyV = RequestBodyV;
function makeRequestBody(ref, pl) {
    return _1.makeBody(new _1.RequestData(ref, pl));
}
exports.makeRequestBody = makeRequestBody;
function makeRequestBodyV(ref, pl) {
    return _1.makeBody(new _1.RequestDataV(ref, pl));
}
exports.makeRequestBodyV = makeRequestBodyV;
