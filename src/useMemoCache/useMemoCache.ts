import { useMemo } from 'react';

import type { DependencyList } from 'react';
import { areHookInputsEqual } from '../util/areHookInputsEqual';

// eslint-disable-next-line symbol-description
const none = Symbol();

type None = typeof none;

const createCache = <State>() => {
  const cache: Array<[DependencyList, State]> = [];

  const get = (dependencyList: DependencyList) => {
    const cacheEntry = cache.find(([cachedDependencyList]) =>
      areHookInputsEqual(cachedDependencyList, dependencyList)
    );

    if (!cacheEntry) {
      return none;
    }

    const cachedState = cacheEntry[1];

    return cachedState;
  };

  const set = (dependencyList: DependencyList, state: State) => {
    cache.push([dependencyList, state]);
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
