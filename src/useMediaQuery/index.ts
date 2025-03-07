import {type Dispatch, useEffect, useState} from 'react';
import {isBrowser} from '../util/const.js';

const queriesMap = new Map<
	string,
	{mql: MediaQueryList; dispatchers: Set<Dispatch<boolean>>; listener: () => void}
>();

type QueryStateSetter = (matches: boolean) => void;

const createQueryEntry = (query: string) => {
	const mql = matchMedia(query);
	const dispatchers = new Set<QueryStateSetter>();
	const listener = () => {
		for (const d of dispatchers) {
			d(mql.matches);
		}
	};

	mql.addEventListener('change', listener, {passive: true});

	return {
		mql,
		dispatchers,
		listener,
	};
};

const querySubscribe = (query: string, setState: QueryStateSetter) => {
	let entry = queriesMap.get(query);

	if (!entry) {
		entry = createQueryEntry(query);
		queriesMap.set(query, entry);
	}

	entry.dispatchers.add(setState);
	setState(entry.mql.matches);
};

const queryUnsubscribe = (query: string, setState: QueryStateSetter): void => {
	const entry = queriesMap.get(query);

	// Else path is impossible to test in normal situation
	if (entry) {
		const {mql, dispatchers, listener} = entry;
		dispatchers.delete(setState);

		if (dispatchers.size === 0) {
			queriesMap.delete(query);

			if (mql.removeEventListener) {
				mql.removeEventListener('change', listener);
			} else {
				mql.removeListener(listener);
			}
		}
	}
};

type UseMediaQueryOptions = {
	initializeWithValue?: boolean;
};

/**
 * Tracks the state of CSS media query.
 *
 * @param query CSS media query to track.
 * @param options Hook options:
 * `initializeWithValue` (default: `true`) - Determine media query match state on first render. Setting
 * this to false will make the hook yield `undefined` on first render.
 */
export function useMediaQuery(
	query: string,
	options: UseMediaQueryOptions = {},
): boolean | undefined {
	let {initializeWithValue = true} = options;

	if (!isBrowser) {
		initializeWithValue = false;
	}

	const [state, setState] = useState<boolean | undefined>(() => {
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

		return () => {
			queryUnsubscribe(query, setState);
		};
	}, [query]);

	return state;
}
