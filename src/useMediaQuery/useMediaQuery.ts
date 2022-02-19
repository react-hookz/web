import { Dispatch, useCallback, useEffect, useRef } from 'react';
import { usePrevious, useRerender } from '..';
import { isBrowser } from '../util/const';

const queriesMap = new Map<
  string,
  { mql: MediaQueryList; dispatchers: Set<Dispatch<boolean>>; listener: () => void }
>();

type QueryStateSetter = (matches: boolean, initial?: boolean) => void;

const querySubscribe = (query: string, setState: QueryStateSetter) => {
  let entry = queriesMap.get(query);

  if (!entry) {
    const mql = matchMedia(query);
    const dispatchers = new Set<QueryStateSetter>();
    const listener = () => {
      dispatchers.forEach((d) => d(mql.matches));
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

  entry.dispatchers.add(setState);
  setState(entry.mql.matches, true);
};

const queryUnsubscribe = (query: string, setState: QueryStateSetter): void => {
  const entry = queriesMap.get(query);

  // else path is impossible to test in normal situation
  /* istanbul ignore else */
  if (entry) {
    const { mql, dispatchers, listener } = entry;
    dispatchers.delete(setState);

    if (!dispatchers.size) {
      queriesMap.delete(query);

      if (mql.removeEventListener) mql.removeEventListener('change', listener);
      else mql.removeListener(listener);
    }
  }
};

export function useMediaQuery(query: string, matchOnMount?: false): boolean;
export function useMediaQuery(query: string, matchOnMount: true): boolean | undefined;

/**
 * Tracks the state of CSS media query.
 *
 * Defaults to false in SSR environments
 *
 * @param query CSS media query to track.
 * @param matchOnMount whether hook state should be fetched during effects stage instead of
 * synchronous fetch. Set this parameter to `true` for SSR use-cases.
 */
export function useMediaQuery(query: string, matchOnMount?: boolean): boolean | undefined {
  const rerender = useRerender();
  const previousQuery = usePrevious(query);

  const state = useRef<boolean | undefined>();

  const setState = useCallback(
    (matches: boolean, initial?: boolean) => {
      if (state.current !== matches) {
        state.current = matches;

        if (!initial || matchOnMount) rerender();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [matchOnMount]
  );

  // do synchronous subscription only for case we are in browser and mount match required
  if (!matchOnMount && isBrowser && previousQuery !== query) {
    querySubscribe(query, setState);
  }

  // otherwise, match should happen in effect stage
  useEffect(() => {
    if (matchOnMount) {
      querySubscribe(query, setState);
    }

    return () => queryUnsubscribe(query, setState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return state.current;
}
