import { type DependencyList, useEffect, useRef } from 'react';
import type { DependenciesComparator } from '../types';
import { isBrowser } from '../util/const';
import { basicDepsComparator, type EffectCallback, type EffectHook } from '../util/misc';

/**
 * Like `useEffect` but uses provided comparator function to validate dependency changes.
 *
 * @param callback Function that will be passed to the underlying effect hook.
 * @param deps Dependency list like the one passed to `useEffect`.
 * @param comparator Function that compares two dependency arrays,
 * and returns `true` if they're equal.
 * @param effectHook Effect hook that will be used to run
 * `callback`. Must match the type signature of `useEffect`, meaning that the `callback` should be
 * placed as the first argument and the dependency list as second.
 * @param effectHookRestArgs Extra arguments that are passed to the `effectHook`
 * after the `callback` and the dependency list.
 */
// eslint-disable-next-line max-params
export function useCustomCompareEffect<
  Callback extends EffectCallback = EffectCallback,
  Deps extends DependencyList = DependencyList,
  HookRestArgs extends any[] = any[],
  R extends HookRestArgs = HookRestArgs
>(
  callback: Callback,
  deps: Deps,
  comparator: DependenciesComparator<Deps> = basicDepsComparator,
  effectHook: EffectHook<Callback, Deps, HookRestArgs> = useEffect,
  ...effectHookRestArgs: R
): void {
  const dependencies = useRef<Deps>();

  // Effects are not run during SSR, therefore, it makes no sense to invoke the comparator
  if (
    dependencies.current === undefined ||
    (isBrowser && !comparator(dependencies.current, deps))
  ) {
    dependencies.current = deps;
  }

  effectHook(callback, dependencies.current, ...effectHookRestArgs);
}
