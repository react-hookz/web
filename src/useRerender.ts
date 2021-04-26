import { useCallback, useState } from 'react';

const stateChanger = (state) => !state;

/**
 * Return callback function that re-renders component.
 */
export function useRerender(): () => void {
  const [, setState] = useState(false);

  return useCallback(() => {
    setState(stateChanger);
  }, []);
}
