import { useEffect } from 'react';
import { IUseStorageValueOptions, useStorageValue } from './useStorageValue';
import { off, on } from './util/misc';
import { isBrowser } from './util/const';
import { INextState } from './util/resolveHookState';
import { useSyncedRef } from './useSyncedRef';

export type IUseSessionStorageValueOptions<
  T,
  Raw extends boolean | undefined = boolean | undefined,
  InitializeWithValue extends boolean | undefined = boolean | undefined
> = IUseStorageValueOptions<T, Raw, InitializeWithValue> & {
  /**
   * Subscribe to window's `storage` event.
   *
   * @default true
   */
  handleStorageEvent?: boolean;
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

type INewState<T, D, O, S = O extends { raw: true } ? string : T> = INextState<
  S,
  IReturnState<T, D, O>
>;

type IHookReturn<T, D, O> = [IReturnState<T, D, O>, (val: INewState<T, D, O>) => void, () => void];

export function useSessionStorageValue<T = unknown>(
  key: string,
  defaultValue?: null
): IHookReturn<T, typeof defaultValue, IUseSessionStorageValueOptions<T, false, true>>;
export function useSessionStorageValue<T = unknown>(
  key: string,
  defaultValue: null,
  options: IUseSessionStorageValueOptions<T, false | undefined>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useSessionStorageValue<T = unknown>(
  key: string,
  defaultValue: null,
  options: IUseSessionStorageValueOptions<T, false | undefined, true | undefined>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useSessionStorageValue<T = unknown>(
  key: string,
  defaultValue: null,
  options: IUseSessionStorageValueOptions<T, false | undefined, false>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useSessionStorageValue<T = unknown>(
  key: string,
  defaultValue: null,
  options: IUseSessionStorageValueOptions<T, true>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useSessionStorageValue<T = unknown>(
  key: string,
  defaultValue: null,
  options: IUseSessionStorageValueOptions<T, true, true | undefined>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useSessionStorageValue<T = unknown>(
  key: string,
  defaultValue: null,
  options: IUseSessionStorageValueOptions<T, true, false>
): IHookReturn<T, typeof defaultValue, typeof options>;

export function useSessionStorageValue<T>(
  key: string,
  defaultValue: T
): IHookReturn<T, typeof defaultValue, IUseSessionStorageValueOptions<T, false, true>>;

export function useSessionStorageValue<T = unknown>(
  key: string,
  defaultValue: null,
  options: IUseSessionStorageValueOptions<T, false | undefined>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useSessionStorageValue<T = unknown>(
  key: string,
  defaultValue: T,
  options: IUseSessionStorageValueOptions<T, false | undefined, true | undefined>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useSessionStorageValue<T = unknown>(
  key: string,
  defaultValue: T,
  options: IUseSessionStorageValueOptions<T, false | undefined, false>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useSessionStorageValue<T = unknown>(
  key: string,
  defaultValue: T,
  options: IUseSessionStorageValueOptions<T, true>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useSessionStorageValue<T = unknown>(
  key: string,
  defaultValue: T,
  options: IUseSessionStorageValueOptions<T, true, true | undefined>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useSessionStorageValue<T = unknown>(
  key: string,
  defaultValue: T,
  options: IUseSessionStorageValueOptions<T, true, false>
): IHookReturn<T, typeof defaultValue, typeof options>;

export function useSessionStorageValue<T>(
  key: string,
  defaultValue?: T | null,
  options?: IUseSessionStorageValueOptions<T>
): IHookReturn<T, typeof defaultValue, typeof options>;

/**
 * Manages a single SessionStorage key.
 *
 * @param key SessionStorage key to manage
 * @param defaultValue Default value to return in case key not presented in SessionStorage
 * @param options
 */
export function useSessionStorageValue<T>(
  key: string,
  defaultValue: T | null = null,
  options: IUseSessionStorageValueOptions<T> = {}
): IHookReturn<T, typeof defaultValue, typeof options> {
  const { handleStorageEvent = true, ...storageOptions } = options;
  const [value, setValue, removeValue, fetchValue] = useStorageValue(
    sessionStorage,
    key,
    defaultValue,
    storageOptions
  );
  const keyRef = useSyncedRef(key);

  useEffect(() => {
    if (!isBrowser || !handleStorageEvent) return;

    const storageHandler = (ev: StorageEvent) => {
      if (ev.storageArea !== sessionStorage) return;
      if (ev.key !== keyRef.current) return;

      fetchValue();
    };

    on(window, 'storage', storageHandler, { passive: true });

    // eslint-disable-next-line consistent-return
    return () => {
      off(window, 'storage', storageHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleStorageEvent]);

  return [value, setValue, removeValue];
}
