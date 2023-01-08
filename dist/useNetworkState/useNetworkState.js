import { useEffect } from 'react';
import { isBrowser } from "../util/const.js";
import { useSafeState } from "../useSafeState/useSafeState.js";
import { off, on } from "../util/misc.js";
const navigator = isBrowser ? window.navigator : undefined;
const conn = navigator && (navigator.connection || navigator.mozConnection || navigator.webkitConnection);
function getConnectionState(previousState) {
    const online = navigator?.onLine;
    const previousOnline = previousState?.online;
    return {
        online,
        previous: previousOnline,
        since: online === previousOnline ? previousState?.since : new Date(),
        downlink: conn?.downlink,
        downlinkMax: conn?.downlinkMax,
        effectiveType: conn?.effectiveType,
        rtt: conn?.rtt,
        saveData: conn?.saveData,
        type: conn?.type,
    };
}
/**
 * Tracks the state of browser's network connection.
 */
export function useNetworkState(initialState) {
    const [state, setState] = useSafeState(initialState ?? getConnectionState);
    useEffect(() => {
        const handleStateChange = () => {
            setState(getConnectionState);
        };
        on(window, 'online', handleStateChange, { passive: true });
        on(window, 'offline', handleStateChange, { passive: true });
        // it is quite hard to test it in jsdom environment maybe will be improved in future
        /* istanbul ignore next */
        if (conn) {
            on(conn, 'change', handleStateChange, { passive: true });
        }
        return () => {
            off(window, 'online', handleStateChange);
            off(window, 'offline', handleStateChange);
            /* istanbul ignore next */
            if (conn) {
                off(conn, 'change', handleStateChange);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return state;
}
