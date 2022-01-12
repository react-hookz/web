import { useCallback } from 'react';
import { IInitialState, INextState, resolveHookState } from '../util/resolveHookState';
import { useSafeState } from '..';

/**
 * Like `useSafeState`, but can only become `true` or `false`.
 *
 * State setter, in case called without arguments, will change the state to opposite.
 *
 * @param initialState Initial toggle state, defaults to false.
 */
export function useToggle(
  initialState: IInitialState<boolean> = false
): [boolean, (nextState?: INextState<boolean>) => void] {
  // We dont use useReducer (which would end up with less code), because exposed
  // action does not provide functional updates feature.
  // Therefore we have to create and expose our own state setter with
  // toggle logic.
  const [state, setState] = useSafeState(initialState);

  return [
    state,
    useCallback((nextState) => {
      setState((prevState) => {
        if (typeof nextState === 'undefined') {
          return !prevState;
        }

        return Boolean(resolveHookState(nextState, prevState));
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  ];
}
