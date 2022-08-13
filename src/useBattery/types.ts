export type Noop = () => void;

export type BatteryState = {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
};

type BatteryEventType = `${Lowercase<keyof BatteryState>}change`;

type BatteryEventTarget = {
  addEventListener(type: BatteryEventType, callback: Noop): void;
  removeEventListener(type: BatteryEventType, callback: Noop): void;
};

export type Battery = BatteryState & BatteryEventTarget;

type GetBattery = () => Promise<Battery>;

export type HookState =
  | (BatteryState & { isSupported: true; fetched: true })
  | { isSupported: true; fetched: false }
  | { isSupported: false };

export type Listener = (batter: BatteryState) => void;

export type Subscriber = {
  unsubscribe: Noop;
};

declare global {
  interface Navigator {
    getBattery: GetBattery;
  }
}
