import { UseStorageValueOptions, UseStorageValueResult } from '../useStorageValue/useStorageValue';
type UseLocalStorageValue = <Type, Default extends Type = Type, Initialize extends boolean | undefined = boolean | undefined>(key: string, options?: UseStorageValueOptions<Type, Initialize>) => UseStorageValueResult<Type, Default, Initialize>;
/**
 * Manages a single localStorage key.
 */
export declare const useLocalStorageValue: UseLocalStorageValue;
export {};
