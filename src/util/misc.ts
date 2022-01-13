/* eslint-disable @typescript-eslint/no-explicit-any,import/no-cycle */
import { DependencyList } from 'react';
import { IDependenciesComparator } from '../useCustomCompareEffect/useCustomCompareEffect';

export function on<T extends EventTarget>(
  obj: T | null,
  ...args:
    | Parameters<T['addEventListener']>
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
    | [string, EventListenerOrEventListenerObject | CallableFunction, ...any]
): void {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(...(args as Parameters<HTMLElement['removeEventListener']>));
  }
}

export const hasOwnProperty = <
  T extends Record<string | number | symbol, any>,
  K extends string | number | symbol
>(
  obj: T,
  property: K
): obj is T & Record<K, unknown> => Object.prototype.hasOwnProperty.call(obj, property);

export const yieldTrue = () => true as const;
export const yieldFalse = () => false as const;

export const basicDepsComparator: IDependenciesComparator = (d1, d2) => {
  if (d1 === d2) return true;

  if (d1.length !== d2.length) return false;

  for (let i = 0; i < d1.length; i++) {
    if (d1[i] !== d2[i]) {
      return false;
    }
  }

  return true;
};

export type IEffectCallback = (...args: any[]) => any;

export type IEffectHook<
  Callback extends IEffectCallback = IEffectCallback,
  Deps extends DependencyList | undefined = DependencyList | undefined,
  RestArgs extends any[] = any[]
> = ((...args: [Callback, Deps, ...RestArgs]) => void) | ((...args: [Callback, Deps]) => void);
