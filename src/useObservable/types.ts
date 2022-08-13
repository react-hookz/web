import type { Noop } from '../util/const';

export type ObserverCallback = (entry: IntersectionObserverEntry) => void;

export type Observer = {
  readonly subscribe: () => Noop;
};
