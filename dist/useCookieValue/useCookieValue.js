/* eslint-disable @typescript-eslint/no-use-before-define,no-use-before-define */
import Cookies from 'js-cookie';
import { useCallback, useEffect } from 'react';
import { useFirstMountState } from "../useFirstMountState/useFirstMountState.js";
import { useMountEffect } from "../useMountEffect/useMountEffect.js";
import { useSafeState } from "../useSafeState/useSafeState.js";
import { useSyncedRef } from "../useSyncedRef/useSyncedRef.js";
import { isBrowser } from "../util/const.js";
const cookiesSetters = new Map();
const registerSetter = (key, setter) => {
    let setters = cookiesSetters.get(key);
    if (!setters) {
        setters = new Set();
        cookiesSetters.set(key, setters);
    }
    setters.add(setter);
};
const unregisterSetter = (key, setter) => {
    const setters = cookiesSetters.get(key);
    // almost impossible to test in normal situation
    /* istanbul ignore next */
    if (!setters)
        return;
    setters.delete(setter);
    if (!setters.size) {
        cookiesSetters.delete(key);
    }
};
const invokeRegisteredSetters = (key, value, skipSetter) => {
    const setters = cookiesSetters.get(key);
    // almost impossible to test in normal situation
    /* istanbul ignore next */
    if (!setters)
        return;
    setters.forEach((s) => {
        if (s !== skipSetter)
            s(value);
    });
};
/**
 * Manages a single cookie.
 *
 * @param key Name of the cookie to manage.
 * @param options Cookie options that will be used during setting and deleting the cookie.
 */
export function useCookieValue(key, options = {}) {
    // no need to test it, dev-only notification about 3rd party library requirement
    /* istanbul ignore next */
    if (process.env.NODE_ENV === 'development' && Cookies === undefined) {
        throw new ReferenceError('Dependency `js-cookies` is not installed, it is required for `useCookieValue` work.');
    }
    // eslint-disable-next-line prefer-const
    let { initializeWithValue = true, ...cookiesOptions } = options;
    if (!isBrowser) {
        initializeWithValue = false;
    }
    const methods = useSyncedRef({
        set: (value) => {
            setState(value);
            Cookies.set(key, value, cookiesOptions);
            // update all other hooks with the same key
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
    const [state, setState] = useSafeState(isFirstMount && initializeWithValue ? methods.current.fetchVal() : undefined);
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
        useCallback((value) => methods.current.set(value), []),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        useCallback(() => methods.current.remove(), []),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        useCallback(() => methods.current.fetch(), []),
    ];
}
