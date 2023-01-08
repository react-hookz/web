import { useCallback, useEffect } from 'react';
import { useSafeState } from "../useSafeState/useSafeState.js";
import { useSyncedRef } from "../useSyncedRef/useSyncedRef.js";
/**
 * Performs validation when any of provided dependencies has changed.
 *
 * @param validator Function that performs validation.
 * @param deps Dependencies list that passed straight to underlying `useEffect`.
 * @param initialValidity Initial validity state.
 */
export function useValidator(validator, deps, initialValidity = { isValid: undefined }) {
    const [validity, setValidity] = useSafeState(initialValidity);
    const validatorRef = useSyncedRef(() => {
        if (validator.length) {
            validator(setValidity);
        }
        else {
            setValidity(validator());
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
