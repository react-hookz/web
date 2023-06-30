import Cookies from 'js-cookie';
import { type Dispatch, useCallback, useEffect, useState } from 'react';
import { useFirstMountState } from '../useFirstMountState';
import { useMountEffect } from '../useMountEffect';
import { useSyncedRef } from '../useSyncedRef';
import { isBrowser } from '../util/const';

const cookiesSetters = new Map<string, Set<Dispatch<string | null>>>();

const registerSetter = (key: string, setter: Dispatch<string | null>) => {
	let setters = cookiesSetters.get(key);

	if (!setters) {
		setters = new Set();
		cookiesSetters.set(key, setters);
	}

	setters.add(setter);
};

const unregisterSetter = (key: string, setter: Dispatch<string | null>): void => {
	const setters = cookiesSetters.get(key);

	// Almost impossible to test in normal situation
	/* istanbul ignore next */
	if (!setters) return;

	setters.delete(setter);

	if (!setters.size) {
		cookiesSetters.delete(key);
	}
};

const invokeRegisteredSetters = (
	key: string,
	value: string | null,
	skipSetter?: Dispatch<string | null>
) => {
	const setters = cookiesSetters.get(key);

	// Almost impossible to test in normal situation
	/* istanbul ignore next */
	if (!setters) return;

	setters.forEach((s) => {
		if (s !== skipSetter) s(value);
	});
};

export type UseCookieValueOptions<
	InitializeWithValue extends boolean | undefined = boolean | undefined
> = Cookies.CookieAttributes &
	(InitializeWithValue extends undefined
		? {
				/**
				 * Whether to initialize state with the cookie value or `undefined`.
				 *
				 * _We suggest setting this to `false` during SSR._
				 *
				 * @default true
				 */
				initializeWithValue?: InitializeWithValue;
		  }
		: {
				initializeWithValue: InitializeWithValue;
		  });

export type UseCookieValueReturn<V extends undefined | null | string = undefined | null | string> =
	[value: V, set: (value: string) => void, remove: () => void, fetch: () => void];

export function useCookieValue(
	key: string,
	options: UseCookieValueOptions<false>
): UseCookieValueReturn;
export function useCookieValue(key: string, options?: UseCookieValueOptions): UseCookieValueReturn;
/**
 * Manages a single cookie.
 *
 * @param key Name of the cookie to manage.
 * @param options Cookie options that will be used during setting and deleting the cookie.
 */
export function useCookieValue(
	key: string,
	options: UseCookieValueOptions = {}
): UseCookieValueReturn {
	// No need to test it, dev-only notification about 3rd party library requirement
	/* istanbul ignore next */
	if (process.env.NODE_ENV === 'development' && Cookies === undefined) {
		throw new ReferenceError(
			'Dependency `js-cookies` is not installed, it is required for `useCookieValue` work.'
		);
	}

	let { initializeWithValue = true, ...cookiesOptions } = options;

	if (!isBrowser) {
		initializeWithValue = false;
	}

	const methods = useSyncedRef({
		set(value: string) {
			setState(value);
			Cookies.set(key, value, cookiesOptions);
			// Update all other hooks with the same key
			invokeRegisteredSetters(key, value, setState);
		},
		remove() {
			setState(null);
			Cookies.remove(key, cookiesOptions);
			invokeRegisteredSetters(key, null, setState);
		},
		fetchVal: () => Cookies.get(key) ?? null,
		fetch() {
			const val = methods.current.fetchVal();
			setState(val);
			invokeRegisteredSetters(key, val, setState);
		},
	});

	const isFirstMount = useFirstMountState();
	const [state, setState] = useState<string | null | undefined>(
		isFirstMount && initializeWithValue ? methods.current.fetchVal() : undefined
	);

	useMountEffect(() => {
		if (!initializeWithValue) {
			methods.current.fetch();
		}
	});

	useEffect(() => {
		registerSetter(key, setState);

		return () => {
			unregisterSetter(key, setState);
		};
	}, [key]);

	return [
		state,

		useCallback((value: string) => {
			methods.current.set(value);
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []),

		useCallback(() => {
			methods.current.remove();
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []),

		useCallback(() => {
			methods.current.fetch();
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, []),
	];
}
