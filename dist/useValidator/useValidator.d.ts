import { DependencyList, Dispatch } from 'react';
import { InitialState, NextState } from '../util/resolveHookState';
export interface ValidityState extends Record<any, any> {
    isValid: boolean | undefined;
}
export type ValidatorImmediate<V extends ValidityState = ValidityState> = () => V;
export type ValidatorDeferred<V extends ValidityState = ValidityState> = (done: Dispatch<NextState<V>>) => any;
export type Validator<V extends ValidityState = ValidityState> = ValidatorImmediate<V> | ValidatorDeferred<V>;
export type UseValidatorReturn<V extends ValidityState> = [V, () => void];
/**
 * Performs validation when any of provided dependencies has changed.
 *
 * @param validator Function that performs validation.
 * @param deps Dependencies list that passed straight to underlying `useEffect`.
 * @param initialValidity Initial validity state.
 */
export declare function useValidator<V extends ValidityState>(validator: Validator<V>, deps: DependencyList, initialValidity?: InitialState<V>): UseValidatorReturn<V>;
