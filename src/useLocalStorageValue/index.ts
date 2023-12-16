import {
	useStorageValue,
	type UseStorageValueOptions,
	type UseStorageValueResult,
} from '../useStorageValue/index.js';
import { isBrowser, noop } from '../util/const.js';

let IS_LOCAL_STORAGE_AVAILABLE: boolean;

try {
	IS_LOCAL_STORAGE_AVAILABLE = isBrowser && Boolean(window.localStorage);
} catch {
	// No need to test this flag leads to noop behaviour
	/* istanbul ignore next */
	IS_LOCAL_STORAGE_AVAILABLE = false;
}

type UseLocalStorageValue = <
	Type,
	Default extends Type = Type,
	Initialize extends boolean | undefined = boolean | undefined,
>(
	key: string,
	options?: UseStorageValueOptions<Type, Initialize>
) => UseStorageValueResult<Type, Default, Initialize>;

/**
 * Manages a single localStorage key.
 */
export const useLocalStorageValue: UseLocalStorageValue = IS_LOCAL_STORAGE_AVAILABLE
	? (key, options) => {
			return useStorageValue(localStorage, key, options);
		}
	: <
			Type,
			Default extends Type = Type,
			Initialize extends boolean | undefined = boolean | undefined,
		>(
			_key: string,
			_options?: UseStorageValueOptions<Type, Initialize>
		): UseStorageValueResult<Type, Default, Initialize> => {
			if (isBrowser && process.env.NODE_ENV === 'development') {
				console.warn('LocalStorage is not available in this environment');
			}

			return { value: undefined as Type, set: noop, remove: noop, fetch: noop };
		};
