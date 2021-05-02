import { useCallback } from 'react';
import { useSafeState } from './useSafeState';

const stateChanger = (state) => !state;

/**
 * Return callback function that re-renders component.
 */
export function useRerender(): () => void {
  const [, setState] = useSafeState(false);

  return useCallback(() => {
    setState(stateChanger);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
