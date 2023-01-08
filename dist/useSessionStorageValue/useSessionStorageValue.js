import { useStorageValue, } from "../useStorageValue/useStorageValue.js";
import { isBrowser, noop } from "../util/const.js";
let IS_SESSION_STORAGE_AVAILABLE;
try {
    IS_SESSION_STORAGE_AVAILABLE = isBrowser && !!window.sessionStorage;
}
catch {
    // no need to test as this flag leads to noop behaviour
    /* istanbul ignore next */
    IS_SESSION_STORAGE_AVAILABLE = false;
}
/**
 * Manages a single sessionStorage key.
 */
export const useSessionStorageValue = IS_SESSION_STORAGE_AVAILABLE
    ? (key, options) => {
        return useStorageValue(sessionStorage, key, options);
    }
    : (_key, _options) => {
        if (isBrowser && process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.warn('SessionStorage is not available in this environment');
        }
        return { value: undefined, set: noop, remove: noop, fetch: noop };
    };
