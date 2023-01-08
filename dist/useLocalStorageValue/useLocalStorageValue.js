import { useStorageValue, } from "../useStorageValue/useStorageValue.js";
import { isBrowser, noop } from "../util/const.js";
let IS_LOCAL_STORAGE_AVAILABLE;
try {
    IS_LOCAL_STORAGE_AVAILABLE = isBrowser && !!window.localStorage;
}
catch {
    // no need to test this flag leads to noop behaviour
    /* istanbul ignore next */
    IS_LOCAL_STORAGE_AVAILABLE = false;
}
/**
 * Manages a single localStorage key.
 */
export const useLocalStorageValue = IS_LOCAL_STORAGE_AVAILABLE
    ? (key, options) => {
        return useStorageValue(localStorage, key, options);
    }
    : (_key, _options) => {
        if (isBrowser && process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.warn('LocalStorage is not available in this environment');
        }
        return { value: undefined, set: noop, remove: noop, fetch: noop };
    };
