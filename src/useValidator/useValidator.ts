import { DependencyList, Dispatch, useCallback, useEffect } from 'react';
import { useSafeState } from '../useSafeState/useSafeState';
import { useSyncedRef } from '../useSyncedRef/useSyncedRef';
import { InitialState, NextState } from '../util/resolveHookState';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ValidityState extends Record<any, any> {
  isValid: boolean | undefined;
}

export type ValidatorImmediate<V extends ValidityState = ValidityState> = () => V;
export type ValidatorDeferred<V extends ValidityState = ValidityState> = (
  done: Dispatch<NextState<V>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => any;

export type Validator<V extends ValidityState = ValidityState> =
  | ValidatorImmediate<V>
  | ValidatorDeferred<V>;

export type UseValidatorReturn<V extends ValidityState> = [V, () => void];

/**
 * Performs validation when any of provided dependencies has changed.
 *
 * @param validator Function that performs validation.
 * @param deps Dependencies list that passed straight to underlying `useEffect`.
 * @param initialValidity Initial validity state.
 */
export function useValidator<V extends ValidityState>(
  validator: Validator<V>,
  deps: DependencyList,
  initialValidity: InitialState<V> = { isValid: undefined } as V
): UseValidatorReturn<V> {
  const [validity, setValidity] = useSafeState(initialValidity);
  const validatorRef = useSyncedRef(() => {
    if (validator.length) {
      validator(setValidity);
    } else {
      setValidity((validator as ValidatorImmediate<V>)());
    }
  });

  useEffect(() => {
    validatorRef.current();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [
    validity,
    useCallback(() => {
      validatorRef.current();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  ];
}
