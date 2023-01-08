import { useMemo } from 'react';

import type { DependencyList } from 'react';
import { areHookInputsEqual as nativeAreHookInputsEqual } from '../util/areHookInputsEqual';
import { useSyncedRef } from '../useSyncedRef';

// eslint-disable-next-line symbol-description
const none = Symbol();

type None = typeof none;
type CachedItem<State> = { state: State; dependencyList: DependencyList };

export const createMemoCache = <State>(
  customAreHookInputsEqual?: typeof nativeAreHookInputsEqual
) => {
  const cache = new Map<string, Set<CachedItem<State>>>();
  const areHookInputsEqual = customAreHookInputsEqual ?? nativeAreHookInputsEqual;

  const get = (dependencyList: DependencyList) => {
    const key = String(dependencyList);
    const cached = cache.get(key);

    if (!cached) {
      return none;
    }

    const cachedItem = [...cached.values()].find((item) =>
      areHookInputsEqual(item.dependencyList, dependencyList)
    );

    if (cachedItem) {
      return cachedItem.state;
    }

    return none;
  };

  const set = (dependencyList: DependencyList, state: State) => {
    const key = String(dependencyList);

    const hasCachedItem = cache.has(key);

    if (!hasCachedItem) {
      cache.set(key, new Set());
    }

    const cachedItem = cache.get(key);

    if (cachedItem) {
      cachedItem.add({ dependencyList, state });
    }
  };

  const isNone = (state: None | State): state is None => state === none;

  return {
    get,
    set,
    isNone,
  };
};

/**
 * Like useMemo but with cache based on dependency list.
 */
export const useMemoCache = <State>(
  factory: () => State,
  deps: DependencyList,
  customAreHookInputsEqual?: typeof nativeAreHookInputsEqual
): State => {
  const syncedCustomAreHookInputsEqual = useSyncedRef(customAreHookInputsEqual);
  const memoCache = useMemo(
    () => createMemoCache<State>(syncedCustomAreHookInputsEqual.current),
    [syncedCustomAreHookInputsEqual]
  );

  const memo = useMemo(() => {
    const cachedState = memoCache.get(deps);

    if (!memoCache.isNone(cachedState)) {
      return cachedState;
    }

    const state = factory();

    memoCache.set(deps, state);

    return state;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return memo;
};
