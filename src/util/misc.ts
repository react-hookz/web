export function on<T extends EventTarget>(
  obj: T | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: Parameters<T['addEventListener']> | [string, CallableFunction | null, ...any]
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(...(args as Parameters<HTMLElement['addEventListener']>));
  }
}

export function off<T extends EventTarget>(
  obj: T | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: Parameters<T['removeEventListener']> | [string, CallableFunction | null, ...any]
): void {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(...(args as Parameters<HTMLElement['removeEventListener']>));
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export type PartialRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
