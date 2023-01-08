import { useEffect } from 'react';
import { isEqual } from '@react-hookz/deep-equal';
import { useCustomCompareEffect, } from "../useCustomCompareEffect/useCustomCompareEffect.js";
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
export function useDeepCompareEffect(callback, deps, effectHook = useEffect, ...effectHookRestArgs) {
    return useCustomCompareEffect(callback, deps, isEqual, effectHook, ...effectHookRestArgs);
}
