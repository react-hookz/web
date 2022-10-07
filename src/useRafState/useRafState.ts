import { Dispatch, SetStateAction } from 'react';
import { useRafCallback } from '../useRafCallback/useRafCallback';
import { useSafeState } from '../useSafeState/useSafeState';
import { useUnmountEffect } from '../useUnmountEffect/useUnmountEffect';

export function useRafState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
export function useRafState<S = undefined>(): [
  S | undefined,
  Dispatch<SetStateAction<S | undefined>>
];

/**
 * Like `React.useState`, but state is only updated within animation frame.
 */
export function useRafState<S>(
  initialState?: S | (() => S)
): [S | undefined, Dispatch<SetStateAction<S>>] {
  const [state, innerSetState] = useSafeState<S | undefined>(initialState);

  const [setState, cancelRaf] = useRafCallback(innerSetState);

  useUnmountEffect(cancelRaf);

  return [state, setState as Dispatch<SetStateAction<S>>];
}
