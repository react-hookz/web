/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import { isBrowser } from "../util/const.js";
import { basicDepsComparator } from "../util/misc.js";
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
export function useCustomCompareEffect(callback, deps, comparator = basicDepsComparator, effectHook = useEffect, ...effectHookRestArgs) {
    const dependencies = useRef();
    // Effects not working in SSR environment therefore no sense to invoke comparator
    if (dependencies.current === undefined ||
        (isBrowser && !comparator(dependencies.current, deps))) {
        dependencies.current = deps;
    }
    effectHook(callback, dependencies.current, ...effectHookRestArgs);
}
