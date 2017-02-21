import * as v from "./validation.js";

describe("Basic validators", () => {
    class A {
        p1: number;
        p2: string;
    };
    
    let a = new A();

    enum E {
        E1, E2, E3
    };

    let e = E.E1;

    it("isNull", () => {
        expect(v.isNull(null)).toBe(true);
        expect(v.isNull(undefined)).toBe(true);
        expect(v.isNull("a")).toBe(false);
        expect(v.isNull("")).toBe(false);
        expect(v.isNull({})).toBe(false);
    });

    it("isDefined", () => {
        expect(v.isDefined(null)).toBe(false);
        expect(v.isDefined(undefined)).toBe(false);
        expect(v.isDefined("a")).toBe(true);
        expect(v.isDefined("")).toBe(true);
        expect(v.isDefined({})).toBe(true);
    });

    it("isOfType", () => {
        expect(v.isOfType("a", "string")).toBe(true);
        expect(v.isOfType(12, "number")).toBe(true);
        expect(v.isOfType(true, "boolean")).toBe(true);
        expect(v.isOfType([1], "object")).toBe(true);
        expect(v.isOfType({}, "object")).toBe(true);
        expect(v.isOfType(A, "function")).toBe(true);
    });

    it("isOfTypeOrNull", () => {
        expect(v.isOfTypeOrNull("a", "string")).toBe(true);
        expect(v.isOfTypeOrNull(null, "number")).toBe(true);
        expect(v.isOfTypeOrNull(undefined, "boolean")).toBe(true);
        expect(v.isOfTypeOrNull([1], "object")).toBe(true);
        expect(v.isOfTypeOrNull(null, "object")).toBe(true);
    });

    it("isInstanceOf", () => {
        expect(v.isDefined(a)).toBe(true);
        expect(v.isInstanceOf(a, A)).toBe(true);
        expect(v.isInstanceOf([], Array)).toBe(true);
        expect(v.isInstanceOf(a, Object)).toBe(true);
        expect(v.isInstanceOf({}, A)).toBe(false);

    });

    it("isArray", () => {
        expect(v.isArray(a)).toBe(false);
        expect(v.isArray([])).toBe(true);
        expect(v.isArray({})).toBe(false);
    });

    it("isArrayDeep", () => {
        expect(v.isArrayDeep(a)).toBe(false);
        expect(v.isArrayDeep([])).toBe(true);
        expect(v.isArrayDeep({})).toBe(false);

        let fn: v.CheckerFunction = (x) => { return v.isOfType(x, "number") };

        expect(v.isArrayDeep([1, 2, 3], fn)).toBe(true);
        expect(v.isArrayDeep([1, "a", 3], fn)).toBe(false);

    });

    it("isStringLen", () => {
        expect(v.isStringLen("1234", 2)).toBe(true);
        expect(v.isStringLen("1234", 2, 6)).toBe(true);
        expect(v.isStringLen("1234", 7)).toBe(false);
        expect(v.isStringLen("", 2)).toBe(false);

    });

    it("isStringLen", () => {
        expect(v.isInt(12)).toBe(true);
        expect(v.isInt(12.3)).toBe(false);
        expect(v.isInt("a")).toBe(false);
    });

    it("isIntRange", () => {
        expect(v.isIntRange(3, 0, 5)).toBe(true);
        expect(v.isIntRange(3, 0, 2)).toBe(false);
        expect(v.isIntRange(3.5, 0, 5)).toBe(false);
        expect(v.isIntRange('a', 0, 5)).toBe(false);
    });

    it("isStringInSet", () => {
        expect(v.isStringInSet('a', ['b', 'a', 'c'])).toBe(true);
        expect(v.isStringInSet('a', ['b', 'd', 'c'])).toBe(false);
        expect(v.isStringInSet(12, ['b', 'a', 'c'])).toBe(false);
    });
    
    it("isNumberInSet", () => {
        expect(v.isNumberInSet(3.2, [1.1, 2.3, 3.2])).toBe(true);
        expect(v.isNumberInSet('a', [1.1, 2.3, 3.2])).toBe(false);
        expect(v.isNumberInSet(12, [1.1, 2.3, 3.2])).toBe(false);
    });
    
    it("isIntInSet", () => {
        expect(v.isIntInSet(3, [1, 2, 3])).toBe(true);
        expect(v.isIntInSet('a', [1, 2, 3])).toBe(false);
        expect(v.isIntInSet(12, [1, 2, 3])).toBe(false);
    });
    
    it("isEnumType", () => {
        expect(v.isEnumType(e, E)).toBe(true);
        expect(v.isEnumType(E.E1, E)).toBe(true);
        expect(v.isEnumType("E1", E)).toBe(true);
        expect(v.isEnumType("E7", E)).toBe(false);
        expect(v.isEnumType(15, E)).toBe(false);
       
    });
    
    it("isEnumKey", () => {
        expect(v.isEnumKey(e, E)).toBe(false);
        expect(v.isEnumKey(E.E1, E)).toBe(false);
        expect(v.isEnumKey("E1", E)).toBe(true);
        expect(v.isEnumKey(E[e], E)).toBe(true);

    });
    
    it("isEnumValue", () => {
        expect(v.isEnumValue(E[e], E)).toBe(false);
        expect(v.isEnumValue(E.E1, E)).toBe(true);
        expect(v.isEnumValue("E1", E)).toBe(false);
    });
    
});