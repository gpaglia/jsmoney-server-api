/*
 *
 * Validation helpers routines
 * 
 */
// import * as bigjs from 'big.js';
import BigJS = BigJsLibrary.BigJS;

import * as vv from 'validator';
import * as u from './utils';
import {
    Role,
    CommodityType,
    AccountType,
    SecurityType
} from './api.objects';

export const USERNAME_MIN_LEN: number = 4;
export const PASSWORD_MIN_LEN: number = 8;
export const MAX_NAME_LEN: number = 32;

export type CheckerFunction = (i: any) => boolean;

export function isNull(obj: any): boolean {
    return obj == null;
}

export function isDefined(obj: any): boolean {
    return (obj != null);
}

export function isOfType(obj: any, type: string): boolean {
    return isDefined(obj) && (typeof obj === type);
}

export function isOfTypeOrNull(obj: any, type: string): boolean {
    return isNull(obj) || (typeof obj === type);
}

export function isInstanceOf(obj: any, clazz: Function) {
    return isDefined(obj) && obj instanceof clazz;
}

export function isArray(obj: any) {
    return isDefined(obj) && obj instanceof Array;
}

export function isArrayDeep(obj: any, fn: CheckerFunction): boolean {
    if (isArray(obj)) {
        (obj as any[]).forEach((i: any) => {
            if (! fn(i)) {
                return false;
            }
        });
        return true;
    } else {
        return false;
    }
}

export function isStringLen(obj: any, min: number, max: number): boolean {
    return isOfType(obj, 'string') 
        && vv.isLength(obj, {min: min, max: max});
}

export function isInt(obj: any): boolean {
    return isOfType(obj, 'number') && Number.isInteger(obj as number);
}

export function isIntRange(obj: any, min: number, max: number): boolean {
    return (isOfType(obj, 'number') 
            && (obj as number) >= min 
            && (obj as number) <= max
            && Number.isInteger(obj as number));
}

export function isStringInSet(obj: any, strings: string[]): boolean {
    return isOfType(obj, 'string') && strings.indexOf(obj as string) >= 0;
}

export function isNumberInSet(obj: any, numbers: number[]): boolean {
    return isOfType(obj, 'number') && numbers.indexOf(obj as number) >= 0;
}

export function isIntInSet(obj: any, numbers: number[]): boolean {
    return isInt(obj) && numbers.indexOf(obj as number) >= 0;
}

export function isEnumType(obj: any, e: any): boolean {
    return (isOfType(obj, 'number') 
                && u.getEnumNamesAndValues(e).map((nvp) => {return nvp.value}).indexOf(obj as number) >= 0)
            || (isOfType(obj, 'string') 
                && u.getEnumNamesAndValues(e).map((nvp) => {return nvp.name}).indexOf(obj as string) >= 0);
}

export function isEnumKey(obj: any, e: any): boolean {
    return isOfType(obj, 'string') 
                && u.getEnumNames(e).indexOf(obj as string) >= 0;
}

export function isEnumValue(obj: any, e: any): boolean {
    return isInt(obj) 
                && u.getEnumValues(e).indexOf(obj as number) >= 0;
}

// Field Validation

export function isId(obj: any): boolean {
    return vv.isUUID(obj, 4);
}

export function isUsername(obj: any): boolean {
    return isStringLen(obj, USERNAME_MIN_LEN, undefined);
}

export function isPassword(obj: any): boolean {
    return isStringLen(obj, PASSWORD_MIN_LEN, undefined);
}

export function isName(obj: any): boolean {
    return isStringLen(obj.name, 1, MAX_NAME_LEN);
}

export function isCurrencyCode(obj: any): boolean {
    return isOfType(obj, 'string') && /[A-Z][A-Z][A-Z]/.test(obj as string);
}

export function isCurrencyIso(obj: any): boolean {
    return isOfType(obj, 'string') && /[0-9][0-9][0-9]/.test(obj as string);
}

export function isCurrencyScale(obj: any): boolean {
    return isIntRange(obj.scale, 0, MAX_CURRENCY_SCALE);
}

export function isCommodityScale(obj: any): boolean {
    return isIntRange(obj.scale, 0, MAX_COMMODITY_SCALE);
}

export function isCurrencyCodeList(obj: any): boolean {
    return isArrayDeep(obj, isCurrencyCode);
}

export function isRole(obj: any): boolean {
    return isEnumType(obj, Role);
}

export function isCommodityType(obj: any): boolean {
    return isEnumType(obj, CommodityType);
}

export function isSecurityType(obj: any): boolean {
    return isEnumType(obj, SecurityType);
}

export function isAccountType(obj: any): boolean {
    return isEnumType(obj, AccountType);
}

export function isAmount(obj: any) {
    return (isOfType(obj, 'string') && vv.isDecimal(obj)) || isInstanceOf(obj, Big);
}

// Object Validation

export function isVersionedObject(obj: any): boolean {
    return (obj.id == null || isId(obj.id)) && (obj.version == null || obj.version >= 0);
}

export function isCredentialsObject(obj: any): boolean {
    return isUsername(obj.username) && isPassword(obj.password);
}

export const MAX_CURRENCY_SCALE = 5;

export function isCurrencyObject(obj: any): boolean {
    return isCurrencyCode(obj.code)
        && isCurrencyIso(obj.iso)
        && isCurrencyScale(obj.scale)
}

export const MAX_COMMODITY_SCALE = 5;

export function isCommodityObject(obj: any): boolean {
    return isVersionedObject(obj)
            && isOfType(obj.code, 'string')
            && isCommodityType(obj.comType)
            && isCurrencyCode(obj.currencyCode)
            && isOfType(obj.unit, 'string')
            && isCommodityScale(obj.scale);
}

export function isSecurityObject(obj: any): boolean {
    return isVersionedObject(obj) 
            && isCommodityObject(obj)
            && (u.makeEnumIntValue(CommodityType, obj.comType) === CommodityType.security)
            && isSecurityType(obj.secType)
            && isOfTypeOrNull(obj.altSymbol, 'string')
            && isArray(obj.quoteDrivers)
            && (isInstanceOf(obj.lastPrice, Big) || isOfType(obj.lastPrice, 'string'));
}

export function isUserObject(obj: any): boolean {
    return isVersionedObject(obj)
            && isUsername(obj.username)
            && isDefined(obj.firstName)
            && isDefined(obj.lastName)
            && vv.isEmail(obj.email)
            && isRole(obj.role);
}

export function isAuthenticateData(obj: any) {
    return isUserObject(obj.user) && isOfType(obj.token, 'string');
}

export function isDatasetObject(obj: any) {
    return isVersionedObject(obj)
            && isName(obj.name)
            && isCurrencyCode(obj.currencyCode)
            && isCurrencyCodeList(obj.additionalCurrencies);
}

export function isAccountObject(obj: any) {
    return isVersionedObject(obj)
            && isName(obj.name)
            && isAccountType(obj.accType)
            && isCurrencyCode(obj.currencyCode)
            && isCurrencyScale(obj.scale)
            && isAmount(obj.qty);
}

