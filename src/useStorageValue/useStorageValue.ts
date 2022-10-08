/* eslint-disable @typescript-eslint/no-use-before-define,no-use-before-define */
import { useCallback, useState } from 'react';
import { useConditionalEffect } from '../useConditionalEffect/useConditionalEffect';
import { useFirstMountState } from '../useFirstMountState/useFirstMountState';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect/useIsomorphicLayoutEffect';
import { useMountEffect } from '../useMountEffect/useMountEffect';
import { usePrevious } from '../usePrevious/usePrevious';
import { useSyncedRef } from '../useSyncedRef/useSyncedRef';
import { useUpdateEffect } from '../useUpdateEffect/useUpdateEffect';
import { NextState, resolveHookState } from '../util/resolveHookState';
import { isBrowser } from '../util/const';
import { off, on } from '../util/misc';

export type UseStorageValueOptions<
  InitializeWithValue extends boolean | undefined = boolean | undefined
> = {
  /**
   * Whether to store default value to store.
   *
   * @default false
   */
  storeDefaultValue?: boolean;

  /**
   * Disable synchronisation with other hook instances with the same key on the same page.
   *
   * @default false
   */
  isolated?: boolean;

  /**
   * Subscribe to window's `storage` event.
   *
   * @default true
   */
  handleStorageEvent?: boolean;
} & (InitializeWithValue extends undefined
  ? {
      /**
       * Whether to initialize state with storage value or initialize with `undefined` state.
       *
       * Default to false during SSR
       *
       * @default true
       */
      initializeWithStorageValue?: InitializeWithValue;
    }
  : {
      initializeWithStorageValue: InitializeWithValue;
    });

export type ReturnState<
  T,
  D,
  O,
  N = D extends null | undefined ? null | T : T,
  U = O extends { initializeWithStorageValue: false } ? undefined | N : N
> = U;

export type HookReturn<T, D, O> = [
  ReturnState<T, D, O>,
  (val: NextState<T, ReturnState<T, D, O>>) => void,
  () => void,
  () => void
];

export function useStorageValue<T = unknown>(
  storage: Storage,
  key: string,
  defaultValue?: null,
  options?: UseStorageValueOptions
): HookReturn<T, typeof defaultValue, UseStorageValueOptions<true | undefined>>;
export function useStorageValue<T = unknown>(
  storage: Storage,
  key: string,
  defaultValue: null,
  options: UseStorageValueOptions<false>
): HookReturn<T, typeof defaultValue, typeof options>;

export function useStorageValue<T>(
  storage: Storage,
  key: string,
  defaultValue: T,
  options?: UseStorageValueOptions
): HookReturn<T, typeof defaultValue, UseStorageValueOptions<true | undefined>>;
export function useStorageValue<T>(
  storage: Storage,
  key: string,
  defaultValue: T,
  options: UseStorageValueOptions<false>
): HookReturn<T, typeof defaultValue, typeof options>;

export function useStorageValue<T>(
  storage: Storage,
  key: string,
  defaultValue?: T | null,
  options?: UseStorageValueOptions
): HookReturn<T, typeof defaultValue, typeof options>;

/**
 * Manages a single storage key.
 *
 * @param storage Storage instance that will be managed
 * @param key Storage key to manage
 * @param defaultValue Default value to yield in case the key is not in storage
 * @param options
 */
export function useStorageValue<T>(
  storage: Storage,
  key: string,
  defaultValue: T | null = null,
  options: UseStorageValueOptions = {}
): HookReturn<T, typeof defaultValue, typeof options> {
  const { isolated } = options;
  let {
    initializeWithStorageValue = true,
    handleStorageEvent = true,
    storeDefaultValue = false,
  } = options;

  // avoid fetching data from storage during SSR
  if (!isBrowser) {
    storeDefaultValue = false;
    initializeWithStorageValue = false;
    handleStorageEvent = false;
  }

  // needed to provide stable API
  const methods = useSyncedRef({
    fetchVal: () => parse(storage.getItem(key), defaultValue),
    storeVal: (val: T) => {
      const stringified = stringify(val);

      if (stringified) {
        storage.setItem(key, stringified);
        return true;
      }

      return false;
    },
    removeVal: () => {
      storage.removeItem(key);
    },
    setVal: (val: string | null) => {
      setState(parse(val, defaultValue) as T);
    },
    fetchState: () => {
      const newVal = methods.current.fetchVal() as T;
      setState(newVal);

      return newVal !== stateRef.current ? newVal : null;
    },
    setState: (nextState: T | null) => {
      setState(nextState === null ? defaultValue : nextState);
    },
  });

  const isFirstMount = useFirstMountState();
  const [state, setState] = useState<T | null | undefined>(
    initializeWithStorageValue && isFirstMount ? (methods.current.fetchVal() as T) : undefined
  );
  const prevState = usePrevious(state);
  const stateRef = useSyncedRef(state);
  const keyRef = useSyncedRef(key);
  const isolatedRef = useSyncedRef(isolated);

  // fetch value on mount for the case `initializeWithStorageValue` is false,
  // effects are not invoked during SSR, so there is no need to check isBrowser here
  useMountEffect(() => {
    if (!initializeWithStorageValue) {
      methods.current.fetchState();
    }
  });

  // store default value if it is not null and options configured to store default value
  useConditionalEffect(
    () => {
      methods.current.storeVal(defaultValue as T);
    },
    undefined,
    [prevState !== state, storeDefaultValue && state === defaultValue && defaultValue !== null]
  );

  // refetch value when key changed
  useUpdateEffect(() => {
    methods.current.fetchState();
  }, [key]);

  // subscribe hook for storage events
  useIsomorphicLayoutEffect(() => {
    if (!handleStorageEvent) return;

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const storageHandler = (ev: StorageEvent) => {
      if (ev.storageArea !== storage) return;
      if (ev.key !== keyRef.current) return;

      methods.current.setVal(ev.newValue);
    };

    on(window, 'storage', storageHandler, { passive: true });

    return () => {
      off(window, 'storage', storageHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleStorageEvent]);

  // register hook for same-page synchronisation
  useIsomorphicLayoutEffect(() => {
    if (isolated) return;

    let storageKeys = storageKeysUsed.get(storage);

    if (!storageKeys) {
      storageKeys = new Map();
      storageKeysUsed.set(storage, storageKeys);
    }

    let keySetters = storageKeys.get(key);

    if (!keySetters) {
      keySetters = new Set();
      storageKeys.set(key, keySetters);
    }

    const mSetState = methods.current.setState;
    keySetters.add(mSetState);

    return () => {
      keySetters?.delete(mSetState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isolated, key]);

  return [
    state,
    useCallback(
      (newState) => {
        if (!isBrowser) return;

        const s = resolveHookState(newState, stateRef.current);

        if (methods.current.storeVal(s)) {
          methods.current.setState(s);

          if (!isolatedRef.current) {
            // update all other hooks state
            storageKeysUsed
              .get(storage)
              ?.get(keyRef.current)
              ?.forEach((setter) => {
                if (setter === methods.current.setState) return;

                setter(s);
              });
          }
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    ),
    useCallback(() => {
      if (!isBrowser) return;

      methods.current.removeVal();
      methods.current.setState(null);

      if (!isolatedRef.current) {
        // update all other hooks state
        storageKeysUsed
          .get(storage)
          ?.get(keyRef.current)
          ?.forEach((setter) => {
            if (setter === methods.current.setState) return;

            setter(null);
          });
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
    useCallback(() => {
      if (!isBrowser) return;

      const newVal = methods.current.fetchState();
      if (newVal !== null && !isolatedRef.current) {
        // update all other hooks state
        storageKeysUsed
          .get(storage)
          ?.get(keyRef.current)
          ?.forEach((setter) => {
            if (setter === methods.current.setState) return;

            setter(newVal);
          });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  ];
}

const storageKeysUsed = new Map<Storage, Map<string, Set<CallableFunction>>>();

const stringify = (data: unknown): string | null => {
  if (data === null) {
    // eslint-disable-next-line no-console
    console.warn(
      `'null' is not a valid data for useStorageValue hook, this operation will take no effect`
    );
    return null;
  }

  try {
    return JSON.stringify(data);
  } catch (error) /* istanbul ignore next */ {
    // i have absolutely no idea how to cover this, since modern JSON.stringify does not throw on
    // cyclic references anymore
    // eslint-disable-next-line no-console
    console.warn(error);
    return null;
  }
};

const parse = (str: string | null, fallback: unknown): unknown => {
  if (str === null) return fallback;

  try {
    return JSON.parse(str);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    return fallback;
  }
};
