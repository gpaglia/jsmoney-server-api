/**
 * Body
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Requests and Responses
class Body {
    constructor(data) {
        this.data = data;
    }
}
exports.Body = Body;
function getBodyDataAndConvert(body, parser) {
    return parser(body.data);
}
exports.getBodyDataAndConvert = getBodyDataAndConvert;
// tslint:disable-next-line:no-any
function getBodyData(body, parser) {
    return parser ? parser(body.data) : body.data;
}
exports.getBodyData = getBodyData;
function makeBody(obj) {
    return new Body(obj);
}
exports.makeBody = makeBody;
