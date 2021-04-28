import { EffectCallback, useEffect, useRef } from 'react';
import { noop, truthyArrayItemsPredicate } from './util/const';
import { useFirstMountState } from './useFirstMountState';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IUseConditionalUpdateEffectPredicate<Cond extends ReadonlyArray<any>> = (
  conditions: Cond
) => boolean;

/**
 * Alike `useUpdateEffect` but callback invoked only if conditions match predicate.
 *
 * @param callback Callback to invoke
 * @param conditions Conditions array
 * @param predicate Predicate that defines whether conditions satisfying certain
 * provision. By default, it is all-truthy provision, meaning that all
 * conditions should be truthy.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useConditionalUpdateEffect<T extends ReadonlyArray<any>>(
  callback: EffectCallback,
  conditions: T,
  predicate: IUseConditionalUpdateEffectPredicate<T> = truthyArrayItemsPredicate
): void {
  const isFirstMount = useFirstMountState();
  const shouldInvoke = !isFirstMount && predicate(conditions);
  // eslint-disable-next-line @typescript-eslint/ban-types
  const deps = useRef<{}>();

  // we want callback invocation only in case all conditions matches predicate
  if (shouldInvoke) {
    deps.current = {};
  }

  // we cant avoid on-mount invocations so slip noop callback for the cases we dont need invocation
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(shouldInvoke ? callback : noop, [deps.current]);
}
