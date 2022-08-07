import { useMemo, useRef } from 'react';

import type { DependencyList } from 'react';

type DepsAreNotEqual<TDeps extends DependencyList> = (savedDeps: TDeps, deps: TDeps) => boolean;

/**
 * Like `useMemo` but with a callback to defines that factory function can be invoked.
 *
 * @param factory useMemo factory function
 * @param deps useMemo dependency list
 * @param depsAreNotEqual defines that factory function can be invoked
 * @returns useMemo result
 */
export const useRetain = <TFactory extends () => unknown, TDeps extends DependencyList>(
  factory: TFactory,
  deps: TDeps,
  depsAreNotEqual: DepsAreNotEqual<TDeps>
) => {
  const savedDeps = useRef<TDeps>(deps);
  const canCall = useRef(false);

  if (canCall.current && depsAreNotEqual(savedDeps.current, deps)) {
    savedDeps.current = deps;
  }

  canCall.current = true;

  // eslint-disable-next-line react-hooks/exhaustive-deps -- missing factory function
  const memo = useMemo(factory, savedDeps.current);

  return memo as ReturnType<TFactory>;
};
