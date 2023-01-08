import { DependencyList } from 'react';
import { EffectHook, EffectCallback } from '../util/misc';
import type { ConditionsList, ConditionsPredicate } from '../types';
/**
 * Like `useEffect` but callback invoked only if conditions match predicate.
 *
 * @param callback Function that will be passed to underlying effect hook.
 * @param deps Dependencies list like for `useEffect`. If not undefined - effect will be
 * triggered when deps change AND conditions satisfy predicate.
 * @param conditions Conditions array.
 * @param predicate Predicate that defines whether conditions satisfying certain
 * provision. By default, it is all-truthy provision, meaning that all
 * conditions should be truthy.
 * @param effectHook Effect hook that will be used to run callback. Must comply `useEffect`
 * signature, meaning that callback should be placed as first argument and dependencies list
 * as second.
 * @param effectHookRestArgs Extra arguments that are passed to `effectHook`.
 */
export declare function useConditionalEffect<Cond extends ConditionsList, Callback extends EffectCallback = EffectCallback, Deps extends DependencyList | undefined = DependencyList | undefined, HookRestArgs extends any[] = any[], R extends HookRestArgs = HookRestArgs>(callback: Callback, deps: Deps, conditions: Cond, predicate?: ConditionsPredicate<Cond>, effectHook?: EffectHook<Callback, Deps, HookRestArgs>, ...effectHookRestArgs: R): void;
