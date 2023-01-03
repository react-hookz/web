import { useMemo } from 'react';

import type { DependencyList } from 'react';
import { areHookInputsEqual } from '../util/areHookInputsEqual';

// eslint-disable-next-line symbol-description
const none = Symbol();

type None = typeof none;
type CachedItem<State> = { state: State; dependencyList: DependencyList };

const createCache = <State>() => {
  const cache = new Map<string, Array<CachedItem<State>>>();

  const get = (dependencyList: DependencyList) => {
    const key = String(dependencyList);
    const cached = cache.get(key);

    if (!cached) {
      return none;
    }

    const cachedItem = cached.find((item) =>
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
      cache.set(key, []);
    }

    const cachedItem = cache.get(key);

    if (cachedItem) {
      cachedItem.push({ dependencyList, state });
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
 * useMemo with cache based on dependency list
 */
export const useMemoCache = <State>(factory: () => State, deps: DependencyList) => {
  const cache = useMemo(() => createCache<State>(), []);

  const memo = useMemo(() => {
    const cachedState = cache.get(deps);

    if (!cache.isNone(cachedState)) {
      return cachedState;
    }

    const state = factory();

    cache.set(deps, state);

    return state;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return memo;
};
