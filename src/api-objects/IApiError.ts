/**
 * ApiCommon
 */

// Api error format
export interface IApiError extends Error {
    readonly name: string;
    readonly status: number;
    readonly message: string;
    readonly otherInfo?: string;
}
