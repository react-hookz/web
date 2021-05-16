import { IHookReturn, IUseStorageValueOptions, useStorageValue } from './useStorageValue';

export function useLocalStorageValue<T = unknown>(
  key: string,
  defaultValue?: null,
  options?: IUseStorageValueOptions
): IHookReturn<T, typeof defaultValue, IUseStorageValueOptions<true | undefined>>;
export function useLocalStorageValue<T = unknown>(
  key: string,
  defaultValue: null,
  options: IUseStorageValueOptions<false>
): IHookReturn<T, typeof defaultValue, typeof options>;

export function useLocalStorageValue<T>(
  key: string,
  defaultValue: T,
  options?: IUseStorageValueOptions
): IHookReturn<T, typeof defaultValue, IUseStorageValueOptions<true | undefined>>;
export function useLocalStorageValue<T>(
  key: string,
  defaultValue: T,
  options: IUseStorageValueOptions<false>
): IHookReturn<T, typeof defaultValue, typeof options>;

export function useLocalStorageValue<T>(
  key: string,
  defaultValue?: T | null,
  options?: IUseStorageValueOptions
): IHookReturn<T, typeof defaultValue, typeof options>;

/**
 * Manages a single localStorage key.
 *
 * @param key Storage key to manage
 * @param defaultValue Default value to yield in case the key is not in storage
 * @param options
 */
export function useLocalStorageValue<T>(
  key: string,
  defaultValue: T | null = null,
  options: IUseStorageValueOptions = {}
): IHookReturn<T, typeof defaultValue, typeof options> {
  return useStorageValue(localStorage, key, defaultValue, options);
}
