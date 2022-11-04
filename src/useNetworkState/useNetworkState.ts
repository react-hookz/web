import { useEffect } from 'react';
import { isBrowser } from '../util/const';
import { useSafeState } from '../useSafeState/useSafeState';
import { off, on } from '../util/misc';
import { InitialState } from '../util/resolveHookState';

export interface NetworkInformation extends EventTarget {
  readonly downlink: number;
  readonly downlinkMax: number;
  readonly effectiveType: 'slow-2g' | '2g' | '3g' | '4g';
  readonly rtt: number;
  readonly saveData: boolean;
  readonly type:
    | 'bluetooth'
    | 'cellular'
    | 'ethernet'
    | 'none'
    | 'wifi'
    | 'wimax'
    | 'other'
    | 'unknown';
}

export interface UseNetworkState {
  /**
   * @desc Whether browser connected to the network or not.
   */
  online: boolean | undefined;
  /**
   * @desc Previous value of `online` property. Helps to identify if browser
   * just connected or lost connection.
   */
  previous: boolean | undefined;
  /**
   * @desc The {Date} object pointing to the moment when state change occurred.
   */
  since: Date | undefined;
  /**
   * @desc Effective bandwidth estimate in megabits per second, rounded to the
   * nearest multiple of 25 kilobits per seconds.
   */
  downlink: NetworkInformation['downlink'] | undefined;
  /**
   * @desc Maximum downlink speed, in megabits per second (Mbps), for the
   * underlying connection technology
   */
  downlinkMax: NetworkInformation['downlinkMax'] | undefined;
  /**
   * @desc Effective type of the connection meaning one of 'slow-2g', '2g', '3g', or '4g'.
   * This value is determined using a combination of recently observed round-trip time
   * and downlink values.
   */
  effectiveType: NetworkInformation['effectiveType'] | undefined;
  /**
   * @desc Estimated effective round-trip time of the current connection, rounded
   * to the nearest multiple of 25 milliseconds
   */
  rtt: NetworkInformation['rtt'] | undefined;
  /**
   * @desc {true} if the user has set a reduced data usage option on the user agent.
   */
  saveData: NetworkInformation['saveData'] | undefined;
  /**
   * @desc The type of connection a device is using to communicate with the network.
   * It will be one of the following values:
   *  - bluetooth
   *  - cellular
   *  - ethernet
   *  - none
   *  - wifi
   *  - wimax
   *  - other
   *  - unknown
   */
  type: NetworkInformation['type'] | undefined;
}

type NavigatorWithConnection = Navigator &
  Partial<Record<'connection' | 'mozConnection' | 'webkitConnection', NetworkInformation>>;
const navigator = isBrowser ? (window.navigator as NavigatorWithConnection) : undefined;

const conn: NetworkInformation | undefined =
  navigator && (navigator.connection || navigator.mozConnection || navigator.webkitConnection);

function getConnectionState(previousState?: UseNetworkState): UseNetworkState {
  const online = navigator?.onLine;
  const previousOnline = previousState?.online;

  return {
    online,
    previous: previousOnline,
    since: online !== previousOnline ? new Date() : previousState?.since,
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
export function useNetworkState(initialState?: InitialState<UseNetworkState>): UseNetworkState {
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
