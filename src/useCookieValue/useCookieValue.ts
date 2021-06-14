/* eslint-disable @typescript-eslint/no-use-before-define */
import { Dispatch, useCallback, useEffect } from 'react';
import * as Cookies from 'js-cookie';
import { useSafeState } from '../useSafeState/useSafeState';
import { useSyncedRef } from '../useSyncedRef/useSyncedRef';
import { isBrowser } from '../util/const';
import { useFirstMountState } from '../useFirstMountState/useFirstMountState';
import { useMountEffect } from '../useMountEffect/useMountEffect';

const cookiesSetters = new Map<string, Set<Dispatch<string | null>>>();

const registerSetter = (key: string, setter: Dispatch<string | null>) => {
  let setters = cookiesSetters.get(key);

  if (!setters) {
    setters = new Set();
    cookiesSetters.set(key, setters);
  }

  setters.add(setter);
};

const unregisterSetter = (key: string, setter: Dispatch<string | null>): void => {
  const setters = cookiesSetters.get(key);

  // almost impossible to test in normal situation
  /* istanbul ignore next */
  if (!setters) return;

  setters.delete(setter);

  if (!setters.size) {
    cookiesSetters.delete(key);
  }
};

const invokeRegisteredSetters = (
  key: string,
  value: string | null,
  skipSetter?: Dispatch<string | null>
) => {
  const setters = cookiesSetters.get(key);

  // almost impossible to test in normal situation
  /* istanbul ignore next */
  if (!setters) return;

  setters.forEach((s) => {
    if (s !== skipSetter) s(value);
  });
};

export type IUseCookieValueOptions<
  InitializeWithValue extends boolean | undefined = boolean | undefined
> = Cookies.CookieAttributes &
  (InitializeWithValue extends undefined
    ? {
        /**
         * Whether to initialize state with cookie value or initialize with `undefined` state.
         *
         * Default to false during SSR
         *
         * @default true
         */
        initializeWithValue?: InitializeWithValue;
      }
    : {
        initializeWithValue: InitializeWithValue;
      });

export type IUseCookieValueReturn<V extends undefined | null | string = undefined | null | string> =
  [value: V, set: (value: string) => void, remove: () => void, fetch: () => void];

export function useCookieValue(
  key: string,
  options: IUseCookieValueOptions<false>
): IUseCookieValueReturn;
export function useCookieValue(
  key: string,
  options?: IUseCookieValueOptions
): IUseCookieValueReturn<null | string>;
/**
 * Manages a single cookie.
 *
 * @param key Cookie name to manage.
 * @param options Cookie options that will be used during cookie set and delete.
 */
export function useCookieValue(
  key: string,
  options: IUseCookieValueOptions = {}
): IUseCookieValueReturn {
  // no need to test it, dev-only notification about 3rd party library requirement
  /* istanbul ignore next */
  if (process.env.NODE_ENV === 'development' && typeof Cookies === 'undefined') {
    throw ReferenceError(
      'Dependency `js-cookies` is not installed, it is required for `useCookieValue` work.'
    );
  }

  // eslint-disable-next-line prefer-const
  let { initializeWithValue = true, ...cookiesOptions } = options;

  if (!isBrowser) {
    initializeWithValue = false;
  }

  const methods = useSyncedRef({
    set: (value: string) => {
      setState(value);
      Cookies.set(key, value, cookiesOptions);
      // update all other hooks managing the same key
      invokeRegisteredSetters(key, value, setState);
    },
    remove: () => {
      setState(null);
      Cookies.remove(key, cookiesOptions);
      invokeRegisteredSetters(key, null, setState);
    },
    fetchVal: () => Cookies.get(key) ?? null,
    fetch: () => {
      const val = methods.current.fetchVal();
      setState(val);
      invokeRegisteredSetters(key, val, setState);
    },
  });

  const isFirstMount = useFirstMountState();
  const [state, setState] = useSafeState<string | null | undefined>(
    isFirstMount && initializeWithValue ? methods.current.fetchVal() : undefined
  );

  useMountEffect(() => {
    if (!initializeWithValue) {
      methods.current.fetch();
    }
  });

  useEffect(() => {
    registerSetter(key, setState);

    return () => {
      unregisterSetter(key, setState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [
    state,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback((value: string) => methods.current.set(value), []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(() => methods.current.remove(), []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useCallback(() => methods.current.fetch(), []),
  ];
}
