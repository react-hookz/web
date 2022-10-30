import { DependencyList, useEffect } from 'react';
import { isEqual } from '@react-hookz/deep-equal';
import {
  EffectCallback,
  EffectHook,
  useCustomCompareEffect,
} from '../useCustomCompareEffect/useCustomCompareEffect';

/**
 * Like `useEffect` but uses `@react-hookz/deep-equal` comparator function to validate deep
 * dependency changes.
 *
 * @param callback Function that will be passed to underlying effect hook.
 * @param deps Dependencies list, like for `useEffect` hook.
 * @param effectHook Effect hook that will be used to run callback. Must comply `useEffect`
 * signature, meaning that callback should be placed as first argument and dependencies list
 * as second.
 * @param effectHookRestArgs Extra arguments that passed to effectHook.
 */
export function useDeepCompareEffect<
  Callback extends EffectCallback = EffectCallback,
  Deps extends DependencyList = DependencyList,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HookRestArgs extends any[] = any[],
  R extends HookRestArgs = HookRestArgs
>(
  callback: Callback,
  deps: Deps,
  effectHook: EffectHook<Callback, Deps, HookRestArgs> = useEffect,
  ...effectHookRestArgs: R
): void {
  return useCustomCompareEffect(callback, deps, isEqual, effectHook, ...effectHookRestArgs);
}
