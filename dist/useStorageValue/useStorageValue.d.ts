import { NextState } from '../util/resolveHookState';
export interface UseStorageValueOptions<T, InitializeWithValue extends boolean | undefined> {
    /**
     * Value to return if `key` is not present in LocalStorage.
     *
     * @default undefined
     */
    defaultValue?: T;
    /**
     * Fetch storage value on first render. If set to `false` will make the hook yield `undefined` on
     * first render and defer fetching of the value until effects are executed.
     *
     * @default true
     */
    initializeWithValue?: InitializeWithValue;
    /**
     * Custom function to parse storage value with.
     */
    parse?: (str: string | null, fallback: T | null) => T | null;
    /**
     * Custom function to stringify value to store with.
     */
    stringify?: (data: unknown) => string | null;
}
type UseStorageValueValue<Type, Default extends Type = Type, Initialize extends boolean | undefined = boolean | undefined, N = Default extends null | undefined ? null | Type : Type, U = Initialize extends false | undefined ? undefined | N : N> = U;
export interface UseStorageValueResult<Type, Default extends Type = Type, Initialize extends boolean | undefined = boolean | undefined> {
    value: UseStorageValueValue<Type, Default, Initialize>;
    set: (val: NextState<Type, UseStorageValueValue<Type, Default, Initialize>>) => void;
    remove: () => void;
    fetch: () => void;
}
export declare function useStorageValue<Type, Default extends Type = Type, Initialize extends boolean | undefined = boolean | undefined>(storage: Storage, key: string, options?: UseStorageValueOptions<Type, Initialize>): UseStorageValueResult<Type, Default, Initialize>;
export {};
