import { DependencyList } from 'react';
import { EffectCallback, EffectHook } from '../useCustomCompareEffect/useCustomCompareEffect';
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
export declare function useDeepCompareEffect<Callback extends EffectCallback = EffectCallback, Deps extends DependencyList = DependencyList, HookRestArgs extends any[] = any[], R extends HookRestArgs = HookRestArgs>(callback: Callback, deps: Deps, effectHook?: EffectHook<Callback, Deps, HookRestArgs>, ...effectHookRestArgs: R): void;
