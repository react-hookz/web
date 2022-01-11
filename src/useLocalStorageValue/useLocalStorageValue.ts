import {
  IHookReturn,
  IUseStorageValueOptions,
  useStorageValue,
} from '../useStorageValue/useStorageValue';
import { isBrowser, noop } from '../util/const';

let IS_LOCAL_STORAGE_AVAILABLE = false;

try {
  IS_LOCAL_STORAGE_AVAILABLE = isBrowser && !!window.localStorage;
} catch {
  // no need to test this flag leads to noop behaviour
  /* istanbul ignore next */
  IS_LOCAL_STORAGE_AVAILABLE = false;
}

interface IUseLocalStorageValue {
  <T = unknown>(key: string, defaultValue?: null, options?: IUseStorageValueOptions): IHookReturn<
    T,
    typeof defaultValue,
    IUseStorageValueOptions<true | undefined>
  >;

  <T = unknown>(
    key: string,
    defaultValue: null,
    options: IUseStorageValueOptions<false>
  ): IHookReturn<T, typeof defaultValue, typeof options>;

  <T>(key: string, defaultValue: T, options?: IUseStorageValueOptions): IHookReturn<
    T,
    typeof defaultValue,
    IUseStorageValueOptions<true | undefined>
  >;

  <T>(key: string, defaultValue: T, options: IUseStorageValueOptions<false>): IHookReturn<
    T,
    typeof defaultValue,
    typeof options
  >;

  <T>(key: string, defaultValue?: T | null, options?: IUseStorageValueOptions): IHookReturn<
    T,
    typeof defaultValue,
    typeof options
  >;
}

/**
 * Manages a single localStorage key.
 *
 * @param key Storage key to manage
 * @param defaultValue Default value to yield in case the key is not in storage
 * @param options
 */
export const useLocalStorageValue: IUseLocalStorageValue = IS_LOCAL_STORAGE_AVAILABLE
  ? <T>(
      key: string,
      defaultValue: T | null = null,
      options: IUseStorageValueOptions = {}
    ): IHookReturn<T, typeof defaultValue, typeof options> =>
      useStorageValue(isBrowser ? localStorage : ({} as Storage), key, defaultValue, options)
  : <T>(
      key: string,
      defaultValue: T | null = null,
      options: IUseStorageValueOptions = {}
    ): IHookReturn<T, typeof defaultValue, typeof options> => {
      /* istanbul ignore next */
      if (isBrowser && process.env.NODE_ENV === 'development') {
        console.warn('LocalStorage is not available in this environment');
      }

      return [undefined, noop, noop, noop];
    };
