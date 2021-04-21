import { useCallback, useState } from 'react';
import { IInitialState, INewState, resolveHookState } from './util/resolveHookState';

/**
 * Like `useState`, but can only become `true` or `false`.
 *
 * State setter, in case called without arguments, will change the state to opposite.
 *
 * @param initialState Initial toggle state, defaults to false.
 */
export function useToggle(
  initialState: IInitialState<boolean> = false
): [boolean, (nextState?: INewState<boolean>) => void] {
  // We dont use useReducer (which would end up with less code), because exposed
  // action does not provide functional updates feature.
  // Therefore we have to create and expose our own state setter with
  // toggle logic.
  const [state, _setState] = useState(initialState);

  return [
    state,
    useCallback((nextState) => {
      _setState((prevState) => {
        if (typeof nextState === 'undefined') {
          return !prevState;
        }

        return Boolean(resolveHookState(nextState, prevState));
      });
    }, []),
  ];
}
