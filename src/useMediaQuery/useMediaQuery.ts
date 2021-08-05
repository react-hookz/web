import { Dispatch, useEffect } from 'react';
import { useSafeState } from '..';

const queriesMap = new Map<
  string,
  { mql: MediaQueryList; dispatchers: Set<Dispatch<boolean>>; listener: () => void }
>();

const querySubscribe = (query: string, dispatch: Dispatch<boolean>) => {
  let entry = queriesMap.get(query);

  if (!entry) {
    const mql = matchMedia(query);
    const dispatchers = new Set<Dispatch<boolean>>();
    const listener = () => {
      dispatchers.forEach((d) => {
        d(mql.matches);
      });
    };

    if (mql.addEventListener) mql.addEventListener('change', listener, { passive: true });
    else mql.addListener(listener);

    entry = {
      mql,
      dispatchers,
      listener,
    };
    queriesMap.set(query, entry);
  }

  entry.dispatchers.add(dispatch);
  dispatch(entry.mql.matches);
};

const queryUnsubscribe = (query: string, dispatch: Dispatch<boolean>): void => {
  const entry = queriesMap.get(query);

  // else path is impossible to test in normal situation
  /* istanbul ignore else */
  if (entry) {
    const { mql, dispatchers, listener } = entry;
    dispatchers.delete(dispatch);

    if (!dispatchers.size) {
      queriesMap.delete(query);

      if (mql.removeEventListener) mql.removeEventListener('change', listener);
      else mql.removeListener(listener);
    }
  }
};

/**
 * Tracks the state of CSS media query.
 *
 * @param query CSS media query to track.
 */
export function useMediaQuery(query: string): boolean | undefined {
  const [state, setState] = useSafeState<boolean>();

  useEffect(() => {
    querySubscribe(query, setState);

    return () => {
      queryUnsubscribe(query, setState);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return state;
}
