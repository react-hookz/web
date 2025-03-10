import {
	useStorageValue,
	type UseStorageValueOptions,
	type UseStorageValueResult,
} from '../useStorageValue/index.js';
import {isBrowser, noop} from '../util/const.js';

let IS_SESSION_STORAGE_AVAILABLE: boolean;

try {
	IS_SESSION_STORAGE_AVAILABLE = isBrowser && Boolean(globalThis.sessionStorage);
} catch {
	IS_SESSION_STORAGE_AVAILABLE = false;
}

type UseSessionStorageValue = <
	Type,
	Default extends Type = Type,
	Initialize extends boolean | undefined = boolean | undefined,
>(
	key: string,
	options?: UseStorageValueOptions<Type, Initialize>
) => UseStorageValueResult<Type, Default, Initialize>;

/**
 * Manages a single sessionStorage key.
 */
export const useSessionStorageValue: UseSessionStorageValue = IS_SESSION_STORAGE_AVAILABLE ?
		(key, options) => useStorageValue(sessionStorage, key, options) :
		<
			Type,
			Default extends Type = Type,
			Initialize extends boolean | undefined = boolean | undefined,
		>(
			_key: string,
			_options?: UseStorageValueOptions<Type, Initialize>,
		): UseStorageValueResult<Type, Default, Initialize> => {
			if (isBrowser && process.env.NODE_ENV === 'development') {
				console.warn('SessionStorage is not available in this environment');
			}

			return {value: undefined as Type, set: noop, remove: noop, fetch: noop};
		};
