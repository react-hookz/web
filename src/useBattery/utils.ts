import type { Battery, BatteryState, Noop, Listener } from './types';

const eventsTypes = [
  'chargingchange',
  'chargingtimechange',
  'dischargingtimechange',
  'levelchange',
] as const;

export const addListeners = (battery: Battery, listener: Noop) => {
  eventsTypes.forEach((eventType) => {
    battery.addEventListener(eventType, listener);
  });
};

export const removeListeners = (battery: Battery, listener: Noop) => {
  eventsTypes.forEach((eventType) => {
    battery.removeEventListener(eventType, listener);
  });
};

const getBatteryState = ({ charging, chargingTime, dischargingTime, level }: Battery) => ({
  charging,
  chargingTime,
  dischargingTime,
  level,
});

export const createBatteryControl = () => {
  let savedBattery: Battery | null = null;
  let batteryState: BatteryState | null = null;

  const subscribers = new Set<Noop>();

  const initialize = () => {
    if (savedBattery) {
      return savedBattery;
    }

    return window.navigator.getBattery().then((battery) => {
      savedBattery = battery;
      batteryState = getBatteryState(battery);

      return battery;
    });
  };

  const subscribe = async (listenerImpl: Listener) => {
    const battery = await initialize();

    const listener = () => {
      if (batteryState) {
        listenerImpl(batteryState);
      }
    };

    addListeners(battery, listener);
    subscribers.add(listener);

    return {
      call() {
        listener();
      },
      unsubscribe() {
        if (savedBattery) {
          removeListeners(savedBattery, listener);
          subscribers.delete(listener);
        }
      },
    };
  };

  return {
    subscribe,
  };
};
