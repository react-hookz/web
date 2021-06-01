import { EffectCallback, useEffect, useRef } from 'react';
import { noop, truthyArrayItemsPredicate } from '../util/const';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IUseConditionalEffectPredicate<Cond extends ReadonlyArray<any>> = (
  conditions: Cond
) => boolean;

/**
 * Like `useEffect` but callback invoked only if conditions match predicate.
 *
 * @param callback Callback to invoke
 * @param conditions Conditions array
 * @param predicate Predicate that defines whether conditions satisfying certain
 * provision. By default, it is all-truthy provision, meaning that all
 * conditions should be truthy.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useConditionalEffect<T extends ReadonlyArray<any>>(
  callback: EffectCallback,
  conditions: T,
  predicate: IUseConditionalEffectPredicate<T> = truthyArrayItemsPredicate
): void {
  const shouldInvoke = predicate(conditions);
  // eslint-disable-next-line @typescript-eslint/ban-types
  const deps = useRef<{}>();

  // we want callback invocation only in case all conditions matches predicate
  if (shouldInvoke) {
    deps.current = {};
  }

  // we can't avoid on-mount invocations so slip noop callback for the cases we dont need invocation
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(shouldInvoke ? callback : noop, [deps.current]);
}
