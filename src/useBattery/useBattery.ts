import { useMountEffect, useSafeState } from '..';

import { isBrowser } from '../util/const';
import { shallowEqual } from '../util/shallowEqual';
import type { BatteryState, HookState, Subscriber } from './types';
import { createBatteryControl } from './utils';

const isBatterAPISupported = () => 'navigator' in window && 'getBattery' in window.navigator;

const useBatteryMock = (): HookState => ({ isSupported: false });

const batteryControl = createBatteryControl();

/**
 * Tracks device battery state.
 * @returns battery state
 */
const useBatteryImpl = () => {
  const [state, setState] = useSafeState<HookState>({
    isSupported: true,
    fetched: false,
  });

  useMountEffect(() => {
    let savedSubscriber: Subscriber | null = null;

    // eslint-disable-next-line unicorn/consistent-function-scoping
    const listener = (batteryState: BatteryState) => {
      const nextState: HookState = { ...batteryState, isSupported: true, fetched: true };

      if (!shallowEqual(state, nextState)) {
        setState(nextState);
      }
    };

    batteryControl
      .subscribe(listener)
      .then((subscriber) => {
        subscriber.call();

        savedSubscriber = subscriber;
      })
      .catch(() => {});

    return () => {
      if (savedSubscriber) {
        savedSubscriber.unsubscribe();
      }
    };
  });

  return state;
};

export const useBattery = isBrowser && isBatterAPISupported() ? useBatteryImpl : useBatteryMock;
