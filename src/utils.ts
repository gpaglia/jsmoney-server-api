/*
 *
 * Enum and other utilities
 * 
 */
export type NameAndValue = {
    name: string,
    value: any
}

export function getObjectValues(e: any): any[] {
    return Object.keys(e).map(function (k) { return e[k]; });
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

export function makeEnumIntValue(e: any, opt: number | string) {
    if (typeof opt === 'string') {
        return e[opt];
    } else {
        return e[e[opt]];
    }
}



