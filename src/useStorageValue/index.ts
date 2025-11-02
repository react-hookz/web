import {useEffect, useMemo, useState} from 'react';
import {useFirstMountState} from '../useFirstMountState/index.js';
import {useIsomorphicLayoutEffect} from '../useIsomorphicLayoutEffect/index.js';
import {useSyncedRef} from '../useSyncedRef/index.js';
import {useUpdateEffect} from '../useUpdateEffect/index.js';
import {isBrowser} from '../util/const.js';
import {off, on} from '../util/misc.js';
import type {NextState} from '../util/resolve-hook-state.js';
import {resolveHookState} from '../util/resolve-hook-state.js';

const storageListeners = new Map<Storage, Map<string, Set<CallableFunction>>>();

const invokeStorageKeyListeners = (s: Storage, key: string, value: string | null, skipListener?: CallableFunction) => {
	const listeners = storageListeners.get(s)?.get(key);
	if (listeners === undefined || listeners.size === 0) {
		return;
	}

	for (const listener of listeners) {
		if (listener !== skipListener) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			listener(value);
		}
	}
};

const storageEventHandler = (evt: StorageEvent) => {
	if (evt.storageArea && evt.key && evt.newValue) {
		invokeStorageKeyListeners(evt.storageArea, evt.key, evt.newValue);
	}
};

const addStorageListener = (s: Storage, key: string, listener: CallableFunction) => {
	// In case of first listener added within browser environment we
	// want to bind single storage event handler
	if (isBrowser && storageListeners.size === 0) {
		on(globalThis, 'storage', storageEventHandler, {passive: true});
	}

	let keys = storageListeners.get(s);
	if (!keys) {
		keys = new Map();
		storageListeners.set(s, keys);
	}

	let listeners = keys.get(key);
	if (!listeners) {
		listeners = new Set();
		keys.set(key, listeners);
	}

	listeners.add(listener);
};

const removeStorageListener = (s: Storage, key: string, listener: CallableFunction) => {
	const keys = storageListeners.get(s);

	if (!keys) {
		return;
	}

	const listeners = keys.get(key);

	if (!listeners) {
		return;
	}

	listeners.delete(listener);

	if (listeners.size === 0) {
		keys.delete(key);
	}

	if (keys.size === 0) {
		storageListeners.delete(s);
	}

	// Unbind storage event handler in browser environment in case there is no
	// storage keys listeners left
	if (isBrowser && storageListeners.size === 0) {
		off(globalThis, 'storage', storageEventHandler);
	}
};

export type UseStorageValueOptions<T, InitializeWithValue extends boolean | undefined> = {
	/**
	 * Value to return if `key` is not present in LocalStorage.
	 *
	 * @default undefined
	 */
	defaultValue?: T;

	/**
	 * Fetch storage value on first render. If set to `false` will make the hook yield `undefined` on
	 * first render and defer fetching of the value until effects are executed.
	 *
	 * @default true
	 */
	initializeWithValue?: InitializeWithValue;

	/**
	 * Custom function to parse storage value with.
	 */
	parse?: (str: string | null, fallback: T | null) => T | null;

	/**
	 * Custom function to stringify value to store with.
	 */
	stringify?: (data: T) => string | null;
};

type UseStorageValueValue<
	Type,
	Default extends Type = Type,
	Initialize extends boolean | undefined = boolean | undefined,
	N = Default extends null | undefined ? null | Type : Type,
	U = false extends Initialize ? undefined | N : N,
> = U;

export type UseStorageValueResult<
	Type,
	Default extends Type = Type,
	Initialize extends boolean | undefined = boolean | undefined,
> = {
	value: UseStorageValueValue<Type, Default, Initialize>;

	set: (value: NextState<Type, UseStorageValueValue<Type, Default, Initialize>>) => void;
	remove: () => void;
	fetch: () => void;
};

const DEFAULT_OPTIONS = {
	defaultValue: null,
	initializeWithValue: true,
};

export function useStorageValue<
	Type,
	Default extends Type = Type,
	Initialize extends boolean | undefined = boolean | undefined,
>(
	storage: Storage,
	key: string,
	options?: UseStorageValueOptions<Type, Initialize>,
): UseStorageValueResult<Type, Default, Initialize> {
	const optionsRef = useSyncedRef({...DEFAULT_OPTIONS, ...options});
	const parse = (str: string | null, fallback: Type | null): Type | null => {
		const parseFunction = optionsRef.current.parse ?? defaultParse;
		return parseFunction(str, fallback);
	};

	const stringify = (data: Type): string | null => {
		const stringifyFunction = optionsRef.current.stringify ?? defaultStringify;
		return stringifyFunction(data);
	};

	const storageActions = useSyncedRef({
		fetchRaw: () => storage.getItem(key),
		// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
		fetch: () => parse(storageActions.current.fetchRaw(), optionsRef.current.defaultValue as Required<Type> | null),
		remove() {
			storage.removeItem(key);
		},
		store(value: Type): string | null {
			const stringified = stringify(value);

			if (stringified !== null) {
				storage.setItem(key, stringified);
			}

			return stringified;
		},
	});

	const isFirstMount = useFirstMountState();
	const [state, setState] = useState<Type | null | undefined>(
		optionsRef.current?.initializeWithValue && isFirstMount ? storageActions.current.fetch() : undefined,
	);
	const stateRef = useSyncedRef(state);

	const stateActions = useSyncedRef({
		fetch() {
			setState(storageActions.current.fetch());
		},
		setRawVal(value: string | null) {
			setState(parse(value, optionsRef.current.defaultValue));
		},
	});

	useUpdateEffect(() => {
		stateActions.current.fetch();
	}, [key]);

	useEffect(() => {
		if (!optionsRef.current.initializeWithValue) {
			stateActions.current.fetch();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useIsomorphicLayoutEffect(() => {
		const handler = stateActions.current.setRawVal;

		addStorageListener(storage, key, handler);

		return () => {
			removeStorageListener(storage, key, handler);
		};
	}, [storage, key]);

	const actions = useSyncedRef({
		set(value: NextState<Type, UseStorageValueValue<Type, Default, Initialize>>) {
			if (!isBrowser) {
				return;
			}

			// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
			const s = resolveHookState(value, stateRef.current as UseStorageValueValue<Type, Default, Initialize>);

			const storeValue = storageActions.current.store(s);
			if (storeValue !== null) {
				invokeStorageKeyListeners(storage, key, storeValue);
			}
		},
		delete() {
			if (!isBrowser) {
				return;
			}

			storageActions.current.remove();
			invokeStorageKeyListeners(storage, key, null);
		},
		fetch() {
			if (!isBrowser) {
				return;
			}

			invokeStorageKeyListeners(storage, key, storageActions.current.fetchRaw());
		},
	});

	// Make actions static so developers can pass methods further
	const staticActions = useMemo(
		() => ({
			set: ((v) => {
				actions.current.set(v);
			}) as typeof actions.current.set,
			remove() {
				actions.current.delete();
			},
			fetch() {
				actions.current.fetch();
			},
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[],
	);

	return useMemo(
		() => ({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
			value: state as UseStorageValueValue<Type, Default, Initialize>,
			...staticActions,
		}),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[state],
	);
}

const defaultStringify = (data: unknown): string | null => {
	if (data === null) {
		if (process.env.NODE_ENV === 'development') {
			console.warn("'null' is not a valid data for useStorageValue hook, this operation will take no effect");
		}

		return null;
	}

	try {
		return JSON.stringify(data);
	} catch (error) /* v8 ignore next */ {
		// I have absolutely no idea how to cover this, since modern JSON.stringify does not throw on
		// cyclic references anymore

		console.warn(error);
		return null;
	}
};

const defaultParse = <T>(str: string | null, fallback: T | null): T | null => {
	if (str === null) {
		return fallback;
	}

	try {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return JSON.parse(str);
	} catch (error) {
		console.warn(error);

		return fallback;
	}
};
