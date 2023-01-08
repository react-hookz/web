import { DependencyList } from 'react';
import type { DependenciesComparator } from '../types';
export type EffectCallback = (...args: any[]) => any;
export type EffectHook<Callback extends EffectCallback = EffectCallback, Deps extends DependencyList = DependencyList, RestArgs extends any[] = any[]> = ((...args: [Callback, Deps, ...RestArgs]) => void) | ((...args: [Callback, Deps]) => void);
/**
 * Like `useEffect` but uses provided comparator function to validate dependency changes.
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
export declare function useCustomCompareEffect<Callback extends EffectCallback = EffectCallback, Deps extends DependencyList = DependencyList, HookRestArgs extends any[] = any[], R extends HookRestArgs = HookRestArgs>(callback: Callback, deps: Deps, comparator?: DependenciesComparator<Deps>, effectHook?: EffectHook<Callback, Deps, HookRestArgs>, ...effectHookRestArgs: R): void;
