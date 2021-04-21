export const noop = (): void => {};

export const isBrowser = typeof window !== 'undefined' && typeof navigator !== 'undefined';
