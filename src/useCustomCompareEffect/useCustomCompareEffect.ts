/* eslint-disable @typescript-eslint/no-explicit-any */
import { DependencyList, useEffect, useRef } from 'react';
import { isBrowser } from '../util/const';
// eslint-disable-next-line import/no-cycle
import { basicDepsComparator } from '../util/misc';

export type IDependenciesComparator<Deps extends DependencyList = DependencyList> = (
  a: Deps,
  b: Deps
) => boolean;

export type IEffectCallback = (...args: any[]) => any;

export type IEffectHook<
  Callback extends IEffectCallback = IEffectCallback,
  Deps extends DependencyList = DependencyList,
  RestArgs extends any[] = any[]
> = ((...args: [Callback, Deps, ...RestArgs]) => void) | ((...args: [Callback, Deps]) => void);

/**
 * Like `useEffect` but uses provided comparator function to validate dependencies change.
 *
 * @param callback Function that will be passed to underlying effect hook.
 * @param deps Dependencies list, like for `useEffect` hook.
 * @param comparator Function that compares two dependencies arrays, and returns true in case
 * they're equal.
 * @param effectHook Effect hook that will be used to run callback. Must comply `useEffect`
 * signature, meaning that callback should be placed as first argument and dependencies list
 * as second.
 * @param effectHookRestArgs Extra arguments that passed to effectHook.
 */
export function useCustomCompareEffect<
  Callback extends IEffectCallback = IEffectCallback,
  Deps extends DependencyList = DependencyList,
  HookRestArgs extends any[] = any[],
  R extends HookRestArgs = HookRestArgs
>(
  callback: Callback,
  deps: Deps,
  comparator: IDependenciesComparator<Deps> = basicDepsComparator,
  effectHook: IEffectHook<Callback, Deps, HookRestArgs> = useEffect,
  ...effectHookRestArgs: R
): void {
  const dependencies = useRef<Deps>();

  // Effects not working in SSR environment therefore no sense to invoke comparator
  if (
    dependencies.current === undefined ||
    (isBrowser && !comparator(dependencies.current, deps))
  ) {
    dependencies.current = deps;
  }

  effectHook(callback, dependencies.current, ...effectHookRestArgs);
}
