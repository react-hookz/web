import { DependencyList, EffectCallback, useEffect } from 'react';
import { truthyAndArrayPredicate } from '..';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IUseConditionalEffectPredicate<Cond extends ReadonlyArray<any>> = (
  conditions: Cond
) => boolean;

/**
 * Like `useEffect` but callback invoked only if conditions match predicate.
 *
 * @param callback Callback to invoke
 * @param conditions Conditions array
 * @param deps Dependencies list like for `useEffect`. If set - effect will be
 * triggered when deps changed AND conditions are satisfying predicate.
 * @param predicate Predicate that defines whether conditions satisfying certain
 * provision. By default, it is all-truthy provision, meaning that all
 * conditions should be truthy.
 */
export function useConditionalEffect<T extends ReadonlyArray<unknown>>(
  callback: EffectCallback,
  conditions: T,
  deps?: DependencyList,
  predicate: IUseConditionalEffectPredicate<T> = truthyAndArrayPredicate
): void {
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (predicate(conditions)) {
      return callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
