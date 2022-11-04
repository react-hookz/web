import {
  useStorageValue,
  UseStorageValueOptions,
  UseStorageValueResult,
} from '../useStorageValue/useStorageValue';
import { isBrowser, noop } from '../util/const';

let IS_SESSION_STORAGE_AVAILABLE: boolean;

try {
  IS_SESSION_STORAGE_AVAILABLE = isBrowser && !!window.sessionStorage;
} catch {
  // no need to test as this flag leads to noop behaviour
  /* istanbul ignore next */
  IS_SESSION_STORAGE_AVAILABLE = false;
}

type UseSessionStorageValue = <
  Type,
  Default extends Type = Type,
  Initialize extends boolean | undefined = boolean | undefined
>(
  key: string,
  options?: UseStorageValueOptions<Type, Initialize>
) => UseStorageValueResult<Type, Default, Initialize>;

/**
 * Manages a single sessionStorage key.
 */
export const useSessionStorageValue: UseSessionStorageValue = !IS_SESSION_STORAGE_AVAILABLE
  ? <
      Type,
      Default extends Type = Type,
      Initialize extends boolean | undefined = boolean | undefined
    >(
      _key: string,
      _options?: UseStorageValueOptions<Type, Initialize>
    ): UseStorageValueResult<Type, Default, Initialize> => {
      if (isBrowser && process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('SessionStorage is not available in this environment');
      }

      return { value: undefined as Type, set: noop, remove: noop, fetch: noop };
    }
  : (key, options) => {
      return useStorageValue(sessionStorage, key, options);
    };
