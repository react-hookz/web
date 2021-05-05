import { useEffect } from 'react';
import { IUseStorageValueOptions, useStorageValue } from './useStorageValue';
import { off, on } from './util/misc';
import { isBrowser, noop } from './util/const';
import { INextState } from './util/resolveHookState';

export type IUseLocalStorageValueOptions<
  T,
  Raw extends boolean | undefined = boolean | undefined,
  InitializeWithValue extends boolean | undefined = boolean | undefined
> = IUseStorageValueOptions<T, Raw, InitializeWithValue> & {
  /**
   * Synchronize values between browser tabs.
   *
   * Achieved by subscribing to window's `storage` event.
   *
   * @default true
   */
  syncTabs?: boolean;
};

// below typings monstrosity required to provide most accurate return type hint

type IReturnState<
  T,
  D,
  O,
  S = O extends { raw: true } ? string : T,
  N = D extends null | undefined ? null | S : S,
  U = O extends { initializeWithStorageValue: false } ? undefined | N : N
> = U;

type INewState<T, O, S = O extends { raw: true } ? string : T> = INextState<S>;

type IHookReturn<T, D, O> = [IReturnState<T, D, O>, (val: INewState<T, O>) => void, () => void];

export function useLocalStorageValue<T = unknown>(
  key: string,
  defaultValue?: null
): IHookReturn<T, typeof defaultValue, IUseLocalStorageValueOptions<T, false, true>>;
export function useLocalStorageValue<T = unknown>(
  key: string,
  defaultValue: null,
  options: IUseLocalStorageValueOptions<T, false | undefined>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useLocalStorageValue<T = unknown>(
  key: string,
  defaultValue: null,
  options: IUseLocalStorageValueOptions<T, false | undefined, true | undefined>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useLocalStorageValue<T = unknown>(
  key: string,
  defaultValue: null,
  options: IUseLocalStorageValueOptions<T, false | undefined, false>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useLocalStorageValue<T = unknown>(
  key: string,
  defaultValue: null,
  options: IUseLocalStorageValueOptions<T, true>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useLocalStorageValue<T = unknown>(
  key: string,
  defaultValue: null,
  options: IUseLocalStorageValueOptions<T, true, true | undefined>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useLocalStorageValue<T = unknown>(
  key: string,
  defaultValue: null,
  options: IUseLocalStorageValueOptions<T, true, false>
): IHookReturn<T, typeof defaultValue, typeof options>;

export function useLocalStorageValue<T>(
  key: string,
  defaultValue: T
): IHookReturn<T, typeof defaultValue, IUseLocalStorageValueOptions<T, false, true>>;

export function useLocalStorageValue<T = unknown>(
  key: string,
  defaultValue: null,
  options: IUseLocalStorageValueOptions<T, false | undefined>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useLocalStorageValue<T = unknown>(
  key: string,
  defaultValue: T,
  options: IUseLocalStorageValueOptions<T, false | undefined, true | undefined>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useLocalStorageValue<T = unknown>(
  key: string,
  defaultValue: T,
  options: IUseLocalStorageValueOptions<T, false | undefined, false>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useLocalStorageValue<T = unknown>(
  key: string,
  defaultValue: T,
  options: IUseLocalStorageValueOptions<T, true>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useLocalStorageValue<T = unknown>(
  key: string,
  defaultValue: T,
  options: IUseLocalStorageValueOptions<T, true, true | undefined>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useLocalStorageValue<T = unknown>(
  key: string,
  defaultValue: T,
  options: IUseLocalStorageValueOptions<T, true, false>
): IHookReturn<T, typeof defaultValue, typeof options>;

export function useLocalStorageValue<T>(
  key: string,
  defaultValue?: T | null,
  options?: IUseLocalStorageValueOptions<T>
): IHookReturn<T, typeof defaultValue, typeof options>;

/**
 * Manages a single LocalStorage key.
 *
 * @param key LocalStorage key to manage
 * @param defaultValue Default value to return in case key not presented in LocalStorage
 * @param options
 */
export function useLocalStorageValue<T>(
  key: string,
  defaultValue: T | null = null,
  options: IUseLocalStorageValueOptions<T> = {}
): IHookReturn<T, typeof defaultValue, typeof options> {
  const { syncTabs = true, ...storageOptions } = options;
  const [value, setValue, removeValue, fetchValue] = useStorageValue(
    localStorage,
    key,
    defaultValue,
    storageOptions
  );

  useEffect(() => {
    if (!isBrowser || !syncTabs) return noop;

    on(window, 'storage', fetchValue, { passive: true });

    return () => {
      off(window, 'storage', fetchValue);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncTabs]);

  return [value, setValue, removeValue];
}
