import Cookies from 'js-cookie';
export type UseCookieValueOptions<InitializeWithValue extends boolean | undefined = boolean | undefined> = Cookies.CookieAttributes & (InitializeWithValue extends undefined ? {
    /**
     * Whether to initialize state with the cookie value or `undefined`.
     *
     * _We suggest setting this to `false` during SSR._
     *
     * @default true
     */
    initializeWithValue?: InitializeWithValue;
} : {
    initializeWithValue: InitializeWithValue;
});
export type UseCookieValueReturn<V extends undefined | null | string = undefined | null | string> = [
    value: V,
    set: (value: string) => void,
    remove: () => void,
    fetch: () => void
];
export declare function useCookieValue(key: string, options: UseCookieValueOptions<false>): UseCookieValueReturn;
export declare function useCookieValue(key: string, options?: UseCookieValueOptions): UseCookieValueReturn<null | string>;
