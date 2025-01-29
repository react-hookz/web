import {type Dispatch, useEffect, useState} from 'react';
import {isBrowser} from '../util/const.js';

const queriesMap = new Map<
	string,
	{
		mql: MediaQueryList;
		dispatchers: Set<Dispatch<boolean>>;
		listener: () => void;
	}
>();

type QueryStateSetter = (matches: boolean) => void;

const createQueryEntry = (query: string) => {
	const mql = matchMedia(query);
	if (!mql) {
		if (
			typeof process === 'undefined' ||
			process.env === undefined ||
			process.env.NODE_ENV === 'development' ||
			process.env.NODE_ENV === 'test'
		) {
			console.error(`error: matchMedia('${query}') returned null, this means that the browser does not support this query or the query is invalid.`);
		}

		return {
			mql: {
				onchange: null,
				matches: undefined as unknown as boolean,
				media: query,
				addEventListener: () => undefined as void,
				addListener: () => undefined as void,
				removeListener: () => undefined as void,
				removeEventListener: () => undefined as void,
				dispatchEvent: () => false as boolean,
			},
			dispatchers: new Set<Dispatch<boolean>>(),
			listener: () => undefined as void,
		};
	}

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
				// eslint-disable-next-line @typescript-eslint/no-deprecated
				mql.removeListener(listener);
			}
		}
	}
};

type UseMediaQueryOptions = {
	initializeWithValue?: boolean;
	enabled?: boolean;
};

/**
 * Tracks the state of CSS media query.
 *
 * @param query CSS media query to track.
 * @param options Hook options:
 * `initializeWithValue` (default: `true`) - Determine media query match state on first render. Setting
 * this to false will make the hook yield `undefined` on first render.
 * `enabled` (default: `true`) - Enable or disable the hook.
 */
export function useMediaQuery(
	query: string,
	options: UseMediaQueryOptions = {},
): boolean | undefined {
	let {initializeWithValue = true, enabled = true} = options;

	if (!isBrowser) {
		initializeWithValue = false;
	}

	const [state, setState] = useState<boolean | undefined>(() => {
		if (initializeWithValue && enabled) {
			let entry = queriesMap.get(query);
			if (!entry) {
				entry = createQueryEntry(query);
				queriesMap.set(query, entry);
			}

			return entry.mql.matches;
		}
	});

	useEffect(() => {
		if (!enabled) {
			return;
		}

		querySubscribe(query, setState);

		return () => {
			queryUnsubscribe(query, setState);
		};
	}, [query, enabled]);

	return state;
}
