import { DependencyList, Dispatch, useCallback, useEffect } from 'react';
import { useSafeState } from '../useSafeState/useSafeState';
import { IInitialState, INextState } from '../util/resolveHookState';
import { useSyncedRef } from '../useSyncedRef/useSyncedRef';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IValidityState extends Record<any, any> {
  isValid: boolean | undefined;
}

export type IValidatorImmediate<V extends IValidityState = IValidityState> = () => V;
export type IValidatorDeferred<V extends IValidityState = IValidityState> = (
  done: Dispatch<INextState<V>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => any;

export type IValidator<V extends IValidityState = IValidityState> =
  | IValidatorImmediate<V>
  | IValidatorDeferred<V>;

export type IUseValidatorReturn<V extends IValidityState> = [V, () => void];

/**
 * Performs validation when any of provided dependencies has changed.
 *
 * @param validator Function that performs validation.
 * @param deps Dependencies list that passed straight to underlying `useEffect`.
 * @param initialValidity Initial validity state.
 */
export function useValidator<V extends IValidityState>(
  validator: IValidator<V>,
  deps: DependencyList,
  initialValidity: IInitialState<V> = { isValid: undefined } as V
): IUseValidatorReturn<V> {
  const [validity, setValidity] = useSafeState(initialValidity);
  const validatorRef = useSyncedRef(() => {
    if (validator.length) {
      validator(setValidity);
    } else {
      setValidity((validator as IValidatorImmediate<V>)());
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
