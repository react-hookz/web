import {isEqual} from '@ver0/deep-equal';
import type {DependencyList} from 'react';
import {useEffect} from 'react';
import {useCustomCompareEffect} from '../useCustomCompareEffect/index.js';
import type {EffectCallback, EffectHook} from '../util/misc.js';

/**
 * Like `useEffect`, but uses `@ver0/deep-equal` comparator function to validate deep
 * dependency changes.
 *
 * @param callback Function that will be passed to the underlying effect hook.
 * @param deps Dependency list like the one passed to `useEffect`.
 * @param effectHook Effect hook that will be used to run
 * `callback`. Must match the type signature of `useEffect`, meaning that the `callback` should be
 * placed as the first argument and the dependency list as second.
 * @param effectHookRestArgs Extra arguments that are passed to the `effectHook`
 * after the `callback` and the dependency list.
 */
export function useDeepCompareEffect<
	Callback extends EffectCallback = EffectCallback,
	Deps extends DependencyList = DependencyList,
	HookRestArgs extends any[] = any[],
	R extends HookRestArgs = HookRestArgs,
>(
	callback: Callback,
	deps: Deps,
	effectHook: EffectHook<Callback, Deps, HookRestArgs> = useEffect,
	...effectHookRestArgs: R
): void {
	useCustomCompareEffect(callback, deps, isEqual, effectHook, ...effectHookRestArgs);
}
