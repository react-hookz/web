export function on<T extends EventTarget>(
  obj: T | null,
  ...args:
    | Parameters<T['addEventListener']>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | [string, EventListenerOrEventListenerObject | CallableFunction, ...any]
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(...(args as Parameters<HTMLElement['addEventListener']>));
  }
}

export function off<T extends EventTarget>(
  obj: T | null,
  ...args:
    | Parameters<T['removeEventListener']>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | [string, EventListenerOrEventListenerObject | CallableFunction, ...any]
): void {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(...(args as Parameters<HTMLElement['removeEventListener']>));
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hasOwnProperty = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string | number | symbol, any>,
  K extends string | number | symbol
>(
  obj: T,
  property: K
): obj is T & Record<K, unknown> => Object.prototype.hasOwnProperty.call(obj, property);

export const yieldTrue = () => true as const;
export const yieldFalse = () => false as const;
