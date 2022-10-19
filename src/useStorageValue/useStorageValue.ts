/* eslint-disable @typescript-eslint/no-use-before-define,no-use-before-define */
import { useEffect, useMemo, useState } from 'react';
import { useFirstMountState } from '../useFirstMountState/useFirstMountState';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect';
import { useSyncedRef } from '../useSyncedRef/useSyncedRef';
import { useUpdateEffect } from '../useUpdateEffect/useUpdateEffect';
import { isBrowser } from '../util/const';
import { off, on } from '../util/misc';
import { NextState, resolveHookState } from '../util/resolveHookState';

const storageListeners = new Map<Storage, Map<string, Set<CallableFunction>>>();

const invokeStorageKeyListeners = (
  s: Storage,
  key: string,
  value: string | null,
  skipListener?: CallableFunction
) => {
  storageListeners
    .get(s)
    ?.get(key)
    ?.forEach((listener) => {
      if (listener !== skipListener) {
        listener(value);
      }
    });
};

const storageEventHandler = (evt: StorageEvent) => {
  if (evt.storageArea && evt.key && evt.newValue) {
    invokeStorageKeyListeners(evt.storageArea, evt.key, evt.newValue);
  }
};

const addStorageListener = (s: Storage, key: string, listener: CallableFunction) => {
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

const removeStorageListener = (s: Storage, key: string, listener: CallableFunction) => {
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

export interface UseStorageValueOptions<T, InitializeWithValue extends boolean | undefined> {
  /**
   * Default value that will be used in absence of value in storage.
   *
   * @default undefined
   */
  defaultValue?: T;

  /**
   * Whether to initialize state with storage value or initialize with `undefined` state.
   *
   * @default true
   */
  initializeWithValue?: InitializeWithValue;
}

type UseStorageValueValue<
  Type,
  Default extends Type = Type,
  Initialize extends boolean | undefined = boolean | undefined,
  N = Default extends null | undefined ? null | Type : Type,
  U = Initialize extends false | undefined ? undefined | N : N
> = U;

export interface UseStorageValueResult<
  Type,
  Default extends Type = Type,
  Initialize extends boolean | undefined = boolean | undefined
> {
  value: UseStorageValueValue<Type, Default, Initialize>;

  set: (val: NextState<Type, UseStorageValueValue<Type, Default, Initialize>>) => void;
  remove: () => void;
  fetch: () => void;
}

const DEFAULT_OPTIONS: UseStorageValueOptions<null, true> = {
  defaultValue: null,
  initializeWithValue: true,
};

export function useStorageValue<
  Type,
  Default extends Type = Type,
  Initialize extends boolean | undefined = boolean | undefined
>(
  storage: Storage,
  key: string,
  options?: UseStorageValueOptions<Type, Initialize>
): UseStorageValueResult<Type, Default, Initialize> {
  const optionsRef = useSyncedRef({ ...DEFAULT_OPTIONS, ...options });
  const storageActions = useSyncedRef({
    fetchRaw: () => storage.getItem(key),
    fetch: () =>
      parse(
        storageActions.current.fetchRaw(),
        optionsRef.current.defaultValue as Required<Type> | null
      ),
    remove: () => storage.removeItem(key),
    store: (val: Type): string | null => {
      const stringified = stringify(val);

      if (stringified !== null) {
        storage.setItem(key, stringified);
      }

      return stringified;
    },
  });

  const isFirstMount = useFirstMountState();
  const [state, setState] = useState<Type | null | undefined>(
    options?.initializeWithValue && isFirstMount ? storageActions.current.fetch() : undefined
  );
  const stateRef = useSyncedRef(state);

  const stateActions = useSyncedRef({
    fetch: () => setState(storageActions.current.fetch()),
    setRawVal: (val: string | null) => {
      setState(parse(val, optionsRef.current.defaultValue));
    },
  });

  useUpdateEffect(() => {
    stateActions.current.fetch();
  }, [key]);

  useEffect(() => {
    if (!options?.initializeWithValue) {
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
    set: (val: NextState<Type, UseStorageValueValue<Type, Default, Initialize>>) => {
      if (!isBrowser) return;

      const s = resolveHookState(
        val,
        stateRef.current as UseStorageValueValue<Type, Default, Initialize>
      );

      const storeVal = storageActions.current.store(s);
      if (storeVal !== null) {
        invokeStorageKeyListeners(storage, key, storeVal);
      }
    },
    delete: () => {
      if (!isBrowser) return;

      storageActions.current.remove();
      invokeStorageKeyListeners(storage, key, null);
    },
    fetch: () => {
      if (!isBrowser) return;

      invokeStorageKeyListeners(storage, key, storageActions.current.fetchRaw());
    },
  });

  return useMemo(
    () => ({
      value: state as UseStorageValueValue<Type, Default, Initialize>,
      set: actions.current.set,
      remove: actions.current.delete,
      fetch: actions.current.fetch,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state]
  );
}

const stringify = (data: unknown): string | null => {
  if (data === null) {
    /* istanbul ignore next */
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn(
        `'null' is not a valid data for useStorageValue hook, this operation will take no effect`
      );
    }

    return null;
  }

  try {
    return JSON.stringify(data);
  } catch (error) /* istanbul ignore next */ {
    // I have absolutely no idea how to cover this, since modern JSON.stringify does not throw on
    // cyclic references anymore
    // eslint-disable-next-line no-console
    console.warn(error);

    return null;
  }
};

const parse = <T>(str: string | null, fallback: T | null): T | null => {
  if (str === null) return fallback;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(str);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);

    return fallback;
  }
};
