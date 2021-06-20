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

// eslint-disable-next-line @typescript-eslint/naming-convention
export type PartialRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hasOwnProperty = (obj: Record<any, any>, property: string): boolean =>
  Object.prototype.hasOwnProperty.call(obj, property);
