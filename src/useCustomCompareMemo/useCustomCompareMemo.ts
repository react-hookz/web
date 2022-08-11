import { useMemo, useRef } from 'react';

import type { DependencyList } from 'react';

type DepsAreEqual<Deps extends DependencyList> = (savedDeps: Deps, deps: Deps) => boolean;

/**
 * Like `useMemo` but with a callback to defines that factory function can be invoked.
 *
 * @param factory useMemo factory function
 * @param deps useMemo dependency list
 * @param depsAreEqual defines that factory function can be invoked
 * @returns useMemo result
 */
export const useCustomCompareMemo = <Factory extends () => unknown, Deps extends DependencyList>(
  factory: Factory,
  deps: Deps,
  depsAreEqual: DepsAreEqual<Deps>
) => {
  const savedDeps = useRef<Deps>(deps);
  const canCall = useRef(false);

  if (canCall.current && !depsAreEqual(savedDeps.current, deps)) {
    savedDeps.current = deps;
  }

  canCall.current = true;

  // eslint-disable-next-line react-hooks/exhaustive-deps -- missing factory function
  const memo = useMemo(factory, savedDeps.current);

  return memo as ReturnType<Factory>;
};
