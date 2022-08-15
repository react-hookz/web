import {
  HookReturn,
  UseStorageValueOptions,
  useStorageValue,
} from '../useStorageValue/useStorageValue';
import { isBrowser, noop } from '../util/const';

let IS_SESSION_STORAGE_AVAILABLE = false;

try {
  IS_SESSION_STORAGE_AVAILABLE = isBrowser && !!window.sessionStorage;
} catch {
  // no need to test this flag leads to noop behaviour
  /* istanbul ignore next */
  IS_SESSION_STORAGE_AVAILABLE = false;
}

interface UseSessionStorageValue {
  <T = unknown>(key: string, defaultValue?: null, options?: UseStorageValueOptions): HookReturn<
    T,
    typeof defaultValue,
    UseStorageValueOptions<true | undefined>
  >;

  <T = unknown>(
    key: string,
    defaultValue: null,
    options: UseStorageValueOptions<false>
  ): HookReturn<T, typeof defaultValue, typeof options>;

  <T>(key: string, defaultValue: T, options?: UseStorageValueOptions): HookReturn<
    T,
    typeof defaultValue,
    UseStorageValueOptions<true | undefined>
  >;

  <T>(key: string, defaultValue: T, options: UseStorageValueOptions<false>): HookReturn<
    T,
    typeof defaultValue,
    typeof options
  >;

  <T>(key: string, defaultValue?: T | null, options?: UseStorageValueOptions): HookReturn<
    T,
    typeof defaultValue,
    typeof options
  >;
}

/**
 * Manages a single sessionStorage key.
 *
 * @param key Storage key to manage
 * @param defaultValue Default value to yield in case the key is not in storage
 * @param options
 */
export const useSessionStorageValue: UseSessionStorageValue = IS_SESSION_STORAGE_AVAILABLE
  ? <T>(
      key: string,
      defaultValue: T | null = null,
      options: UseStorageValueOptions = {}
    ): HookReturn<T, typeof defaultValue, typeof options> =>
      useStorageValue(sessionStorage, key, defaultValue, options)
  : <T>(
      key: string,
      defaultValue: T | null = null,
      options: UseStorageValueOptions = {}
    ): HookReturn<T, typeof defaultValue, typeof options> => {
      /* istanbul ignore next */
      if (isBrowser && process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('SessionStorage is not available in this environment');
      }

      return [undefined, noop, noop, noop];
    };
