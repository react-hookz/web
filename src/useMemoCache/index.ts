import { useMemo } from 'react';

import type { DependencyList } from 'react';
import { areHookInputsEqual as nativeAreHookInputsEqual } from '../util/areHookInputsEqual';
import { useSyncedRef } from '../useSyncedRef';
import { useCustomCompareMemo } from '../useCustomCompareMemo';

// eslint-disable-next-line symbol-description
const none = Symbol();

type None = typeof none;
type CachedItem<State> = { state: State; dependencyList: DependencyList };

export const createMemoCache = <State>(
  customAreHookInputsEqual?: typeof nativeAreHookInputsEqual
) => {
  const cache = new Set<CachedItem<State>>();
  const areHookInputsEqual = customAreHookInputsEqual ?? nativeAreHookInputsEqual;

  const get = (dependencyList: DependencyList) => {
    const cachedItem = [...cache.values()].find((item) =>
      areHookInputsEqual(item.dependencyList, dependencyList)
    );

    if (cachedItem) {
      return cachedItem.state;
    }

    return none;
  };

  const set = (dependencyList: DependencyList, state: State) => {
    const canAddToItem = ![...cache.values()].some((item) =>
      areHookInputsEqual(item.dependencyList, dependencyList)
    );

    if (canAddToItem) {
      cache.add({ dependencyList, state });
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
 *
 * @param factory useMemo factory function
 * @param deps useMemo dependency list
 * @param customAreHookInputsEqual function which indicates when dependencies are the same
 * @returns useMemo result
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

  const memo = useCustomCompareMemo(
    () => {
      const cachedState = memoCache.get(deps);

      if (!memoCache.isNone(cachedState)) {
        return cachedState;
      }

      const state = factory();

      memoCache.set(deps, state);

      return state;
    },
    deps,
    syncedCustomAreHookInputsEqual.current ?? nativeAreHookInputsEqual
  );

  return memo;
};
