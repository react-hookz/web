import { useEffect, useState } from 'react';
import { isBrowser } from "../util/const.js";
const queriesMap = new Map();
const createQueryEntry = (query) => {
    const mql = matchMedia(query);
    const dispatchers = new Set();
    const listener = () => {
        dispatchers.forEach((d) => d(mql.matches));
    };
    if (mql.addEventListener)
        mql.addEventListener('change', listener, { passive: true });
    else
        mql.addListener(listener);
    return {
        mql,
        dispatchers,
        listener,
    };
};
const querySubscribe = (query, setState) => {
    let entry = queriesMap.get(query);
    if (!entry) {
        entry = createQueryEntry(query);
        queriesMap.set(query, entry);
    }
    entry.dispatchers.add(setState);
    setState(entry.mql.matches);
};
const queryUnsubscribe = (query, setState) => {
    const entry = queriesMap.get(query);
    // else path is impossible to test in normal situation
    /* istanbul ignore else */
    if (entry) {
        const { mql, dispatchers, listener } = entry;
        dispatchers.delete(setState);
        if (!dispatchers.size) {
            queriesMap.delete(query);
            if (mql.removeEventListener)
                mql.removeEventListener('change', listener);
            else
                mql.removeListener(listener);
        }
    }
};
/**
 * Tracks the state of CSS media query.
 *
 * @param query CSS media query to track.
 * @param options Hook options:
 * `initializeWithValue` (default: `true`) - Determine media query match state on first render. Setting
 * this to false will make the hook yield `undefined` on first render.
 */
export function useMediaQuery(query, options = {}) {
    let { initializeWithValue = true } = options;
    if (!isBrowser) {
        initializeWithValue = false;
    }
    const [state, setState] = useState(() => {
        if (initializeWithValue) {
            let entry = queriesMap.get(query);
            if (!entry) {
                entry = createQueryEntry(query);
                queriesMap.set(query, entry);
            }
            return entry.mql.matches;
        }
    });
    useEffect(() => {
        querySubscribe(query, setState);
        return () => queryUnsubscribe(query, setState);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);
    return state;
}
