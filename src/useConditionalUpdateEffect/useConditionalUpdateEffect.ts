import { DependencyList, EffectCallback } from 'react';
import { truthyAndArrayPredicate, useUpdateEffect } from '..';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IConditionsList = ReadonlyArray<any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IUseConditionalUpdateEffectPredicate<Cond extends IConditionsList> = (
  conditions: Cond
) => boolean;

/**
 * Like `useUpdateEffect` but callback invoked only if conditions match predicate.
 *
 * @param callback Callback to invoke
 * @param conditions Conditions array
 * @param deps Dependencies list like for `useEffect`. If set - effect will be
 * triggered when deps changed AND conditions are satisfying predicate.
 * @param predicate Predicate that defines whether conditions satisfying certain
 * provision. By default, it is all-truthy provision, meaning that all
 * conditions should be truthy.
 */
export function useConditionalUpdateEffect<T extends IConditionsList>(
  callback: EffectCallback,
  deps: DependencyList,
  conditions: T,
  predicate: IUseConditionalUpdateEffectPredicate<T> = truthyAndArrayPredicate
): void {
  // eslint-disable-next-line consistent-return
  useUpdateEffect(() => {
    if (predicate(conditions)) {
      return callback();
    }
  }, deps);
}
