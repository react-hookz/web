import { type DependencyList, type Dispatch, useCallback, useEffect, useState } from 'react';
import { useSyncedRef } from '../useSyncedRef/index.js';
import { type InitialState, type NextState } from '../util/resolveHookState.js';

export type ValidityState = {
	isValid: boolean | undefined;
} & Record<any, any>;

export type ValidatorImmediate<V extends ValidityState = ValidityState> = () => V;
export type ValidatorDeferred<V extends ValidityState = ValidityState> = (
	done: Dispatch<NextState<V>>
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
	const [validity, setValidity] = useState(initialValidity);
	const validatorRef = useSyncedRef(() => {
		if (validator.length > 0) {
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
