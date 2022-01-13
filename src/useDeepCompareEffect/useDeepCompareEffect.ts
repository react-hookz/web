import { DependencyList, useEffect } from 'react';
import { isEqual } from '@react-hookz/deep-equal';
import {
  IEffectCallback,
  IEffectHook,
  useCustomCompareEffect,
} from '../useCustomCompareEffect/useCustomCompareEffect';

/**
 * Like `useEffect` but uses `@react-hookz/deep-equal` comparator function to validate deep
 * dependencies change.
 *
 * @param callback Function that will be passed to underlying effect hook.
 * @param deps Dependencies list, like for `useEffect` hook.
 * @param effectHook Effect hook that will be used to run callback. Must comply `useEffect`
 * signature, meaning that callback should be placed as first argument and dependencies list
 * as second.
 * @param effectHookRestArgs Extra arguments that passed to effectHook.
 */
export function useDeepCompareEffect<
  Callback extends IEffectCallback = IEffectCallback,
  Deps extends DependencyList = DependencyList,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HookRestArgs extends any[] = any[],
  R extends HookRestArgs = HookRestArgs
>(
  callback: Callback,
  deps: Deps,
  effectHook: IEffectHook<Callback, Deps, HookRestArgs> = useEffect,
  ...effectHookRestArgs: R
): void {
  return useCustomCompareEffect(callback, deps, isEqual, effectHook, ...effectHookRestArgs);
}
