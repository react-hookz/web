/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { truthyAndArrayPredicate } from "../util/const.js";
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
export function useConditionalEffect(callback, deps, conditions, predicate = truthyAndArrayPredicate, effectHook = useEffect, ...effectHookRestArgs) {
    effectHook((() => {
        if (predicate(conditions)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return callback();
        }
    }), deps, ...effectHookRestArgs);
}
