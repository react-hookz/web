/* eslint-disable @typescript-eslint/no-use-before-define,no-use-before-define */
import { useEffect, useMemo, useState } from 'react';
import { useFirstMountState } from "../useFirstMountState/useFirstMountState.js";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.js";
import { useSyncedRef } from "../useSyncedRef/useSyncedRef.js";
import { useUpdateEffect } from "../useUpdateEffect/useUpdateEffect.js";
import { isBrowser } from "../util/const.js";
import { off, on } from "../util/misc.js";
import { resolveHookState } from "../util/resolveHookState.js";
const storageListeners = new Map();
const invokeStorageKeyListeners = (s, key, value, skipListener) => {
    storageListeners
        .get(s)
        ?.get(key)
        ?.forEach((listener) => {
        if (listener !== skipListener) {
            listener(value);
        }
    });
};
const storageEventHandler = (evt) => {
    if (evt.storageArea && evt.key && evt.newValue) {
        invokeStorageKeyListeners(evt.storageArea, evt.key, evt.newValue);
    }
};
const addStorageListener = (s, key, listener) => {
    // in case of first listener added within browser environment we
    // want to bind single storage event handler
    if (isBrowser && storageListeners.size === 0) {
        on(window, 'storage', storageEventHandler, { passive: true });
    }
    let keys = storageListeners.get(s);
    if (!keys) {
        keys = new Map();
        storageListeners.set(s, keys);
    }
    let listeners = keys.get(key);
    if (!listeners) {
        listeners = new Set();
        keys.set(key, listeners);
    }
    listeners.add(listener);
};
const removeStorageListener = (s, key, listener) => {
    const keys = storageListeners.get(s);
    /* istanbul ignore next */
    if (!keys) {
        return;
    }
    const listeners = keys.get(key);
    /* istanbul ignore next */
    if (!listeners) {
        return;
    }
    listeners.delete(listener);
    if (!listeners.size) {
        keys.delete(key);
    }
    if (!keys.size) {
        storageListeners.delete(s);
    }
    // unbind storage event handler in browser environment in case there is no
    // storage keys listeners left
    if (isBrowser && !storageListeners.size) {
        off(window, 'storage', storageEventHandler);
    }
};
const DEFAULT_OPTIONS = {
    defaultValue: null,
    initializeWithValue: true,
};
export function useStorageValue(storage, key, options) {
    const optionsRef = useSyncedRef({ ...DEFAULT_OPTIONS, ...options });
    const parse = (str, fallback) => {
        const parseFunction = optionsRef.current.parse ?? defaultParse;
        return parseFunction(str, fallback);
    };
    const stringify = (data) => {
        const stringifyFunction = optionsRef.current.stringify ?? defaultStringify;
        return stringifyFunction(data);
    };
    const storageActions = useSyncedRef({
        fetchRaw: () => storage.getItem(key),
        fetch: () => parse(storageActions.current.fetchRaw(), optionsRef.current.defaultValue),
        remove: () => storage.removeItem(key),
        store: (val) => {
            const stringified = stringify(val);
            if (stringified !== null) {
                storage.setItem(key, stringified);
            }
            return stringified;
        },
    });
    const isFirstMount = useFirstMountState();
    const [state, setState] = useState(optionsRef.current?.initializeWithValue && isFirstMount
        ? storageActions.current.fetch()
        : undefined);
    const stateRef = useSyncedRef(state);
    const stateActions = useSyncedRef({
        fetch: () => setState(storageActions.current.fetch()),
        setRawVal: (val) => {
            setState(parse(val, optionsRef.current.defaultValue));
        },
    });
    useUpdateEffect(() => {
        stateActions.current.fetch();
    }, [key]);
    useEffect(() => {
        if (!optionsRef.current.initializeWithValue) {
            stateActions.current.fetch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useIsomorphicLayoutEffect(() => {
        const handler = stateActions.current.setRawVal;
        addStorageListener(storage, key, handler);
        return () => {
            removeStorageListener(storage, key, handler);
        };
    }, [storage, key]);
    const actions = useSyncedRef({
        set: (val) => {
            if (!isBrowser)
                return;
            const s = resolveHookState(val, stateRef.current);
            const storeVal = storageActions.current.store(s);
            if (storeVal !== null) {
                invokeStorageKeyListeners(storage, key, storeVal);
            }
        },
        delete: () => {
            if (!isBrowser)
                return;
            storageActions.current.remove();
            invokeStorageKeyListeners(storage, key, null);
        },
        fetch: () => {
            if (!isBrowser)
                return;
            invokeStorageKeyListeners(storage, key, storageActions.current.fetchRaw());
        },
    });
    // make actions static so developers can pass methods further
    const staticActions = useMemo(() => ({
        set: ((v) => actions.current.set(v)),
        remove: () => actions.current.delete(),
        fetch: () => actions.current.fetch(),
    }), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    return useMemo(() => ({
        value: state,
        ...staticActions,
    }), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]);
}
const defaultStringify = (data) => {
    if (data === null) {
        /* istanbul ignore next */
        if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.warn(`'null' is not a valid data for useStorageValue hook, this operation will take no effect`);
        }
        return null;
    }
    try {
        return JSON.stringify(data);
    }
    catch (error) /* istanbul ignore next */ {
        // I have absolutely no idea how to cover this, since modern JSON.stringify does not throw on
        // cyclic references anymore
        // eslint-disable-next-line no-console
        console.warn(error);
        return null;
    }
};
const defaultParse = (str, fallback) => {
    if (str === null)
        return fallback;
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return JSON.parse(str);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.warn(error);
        return fallback;
    }
};
