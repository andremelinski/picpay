export interface ICountDto {
    count: number
}

export interface ICountBy <T = ICountDto, T2 = string> {
    countBy(parameter: T2):Promise<T>
    }

    export interface ILoadAll<T extends Record<string, any> | string> {
    loadAll(): Promise<T[]>,
    }

    export interface ILoad <T extends Record<string, any>, T2 = string | number>{
    load(parameters: T2):Promise<T>
    }

    export interface ILoadById <T extends Record<string, any>>{
        loadById(id: number | string):Promise<T>
    }

    export interface ILoadArr <T extends Record<string, any> | string, T2 = string | number>{
    load(parameters: T2):Promise<T[]>
    }

    export interface ISave <T extends Record<string, any> | boolean, T2 extends Record<string, any> | string | number>{
        save(payload: T2):Promise<T>
    }

    export interface IParams {
    parameterValues?: any;
    queryStringProps?: any;
    currentPage?: number;
    perPage?: number;
    sort?: string;
    order?: string;
    notNull?: string;
    }

    export type RequireAndOmit<T, Keys extends keyof T = keyof T> =
    {
        [K in Keys]-?: Required<Pick<T, K>> & Required<Pick<T, Exclude<Keys, K>>>
    }[Keys]

    export type RequireWithOmit<T, Keys extends keyof T = keyof T, OmitKeys extends keyof T = keyof T> =
    Omit<T, OmitKeys>
    & {
        [K in Keys]-?: Required<Pick<T, K>> & Required<Pick<T, Exclude<Keys, K>>>
    }[Keys]