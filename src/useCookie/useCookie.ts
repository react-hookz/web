import { Dispatch, useCallback, useEffect } from 'react';
import * as Cookies from 'js-cookie';
import { useSafeState } from '../useSafeState/useSafeState';
import { useSyncedRef } from '../useSyncedRef/useSyncedRef';

export type IUseCookieReturn = [
  value: undefined | null | string,
  set: (value: string) => void,
  remove: () => void,
  fetch: () => void
];

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

/**
 * Manages a single cookie.
 *
 * @param key Cookie name to manage.
 * @param options Cookie options that will be used during cookie set and delete.
 */
export function useCookie(key: string, options?: Cookies.CookieAttributes): IUseCookieReturn {
  // no need to test it, dev-only notification about 3rd party library requirement
  /* istanbul ignore next */
  if (process.env.NODE_ENV === 'development' && typeof Cookies === 'undefined') {
    throw ReferenceError(
      'Dependency `js-cookies` is not installed, it is required for `useCookie` work.'
    );
  }

  const [state, setState] = useSafeState<string | null>();

  const methods = useSyncedRef({
    set: (value: string) => {
      setState(value);
      Cookies.set(key, value, options);
      // update all other hooks managing the same key
      invokeRegisteredSetters(key, value, setState);
    },
    remove: () => {
      setState(null);
      Cookies.remove(key, options);
      invokeRegisteredSetters(key, null, setState);
    },
    fetch: () => {
      const val = Cookies.get(key) ?? null;
      setState(val);
      invokeRegisteredSetters(key, val, setState);
    },
  });

  useEffect(() => {
    registerSetter(key, setState);

    methods.current.fetch();

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
