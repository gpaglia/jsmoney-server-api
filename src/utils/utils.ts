/**
 * Enum and other utilities
 */

/* tslint:disable:no-any */

import * as  Big from "big.js";
import BigJS = BigJsLibrary.BigJS;

export type NameAndValue = {
    name: string,
    value: any
};

export function getObjectValues(e: any): any[] {
    return Object.keys(e).map((k: string) => { return e[k]; });
}

export function getEnumNamesAndValues(e: any): NameAndValue[] {
    return getEnumNames(e).map((_name) => { return { name: _name, value: e[_name] }; });
}

export function getEnumNames(e: any): string[] {
    return getObjectValues(e).filter((v: any) => { return typeof v === "string"; });
}

export function getEnumValues(e: any): number[] {
    return getObjectValues(e).filter((v: any) => { return typeof v === "number"; });
}

export function makeEnumIntValue(e: any, opt: number | string): number {
    if (typeof opt === "string") {
        return e[opt];
    } else {
        return e[e[opt]];
    }
}

export function deepEqualObj(x: any, y: any): boolean {
    if (x && y && typeof x === "object" && typeof y === "object") {
        return (Object.keys(x).length === Object.keys(y).length) &&
                Object.keys(x).every(
                    (key: string) => {return deepEqualObj(x[key], y[key]); },
                    true
                );
    } else {
        return (x === y);
    }
}

// Util toAmount
export function toAmount(v: string | BigJS): BigJS {
    return (v instanceof Big ? v as BigJS : Big(v as string));
}
