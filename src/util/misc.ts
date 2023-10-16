import { type DependencyList } from 'react';
import { type DependenciesComparator } from '../types';

export function on<T extends EventTarget>(
	object: T | null,
	...args:
		| Parameters<T['addEventListener']>
		| [string, EventListenerOrEventListenerObject | CallableFunction, ...any]
): void {
	object?.addEventListener?.(...(args as Parameters<HTMLElement['addEventListener']>));
}

export function off<T extends EventTarget>(
	object: T | null,
	...args:
		| Parameters<T['removeEventListener']>
		| [string, EventListenerOrEventListenerObject | CallableFunction, ...any]
): void {
	object?.removeEventListener?.(...(args as Parameters<HTMLElement['removeEventListener']>));
}

export const hasOwnProperty = <
	T extends Record<string | number | symbol, any>,
	K extends string | number | symbol,
>(
	object: T,
	property: K
): object is T & Record<K, unknown> => Object.prototype.hasOwnProperty.call(object, property);

export const yieldTrue = () => true as const;
export const yieldFalse = () => false as const;

export const basicDepsComparator: DependenciesComparator = (d1, d2) => {
	if (d1 === d2) return true;

	if (d1.length !== d2.length) return false;

	for (const [i, element] of d1.entries()) {
		if (element !== d2[i]) {
			return false;
		}
	}

	return true;
};

export type EffectCallback = (...args: any[]) => any;

export type EffectHook<
	Callback extends EffectCallback = EffectCallback,
	Deps extends DependencyList | undefined = DependencyList | undefined,
	RestArgs extends any[] = any[],
> = ((...args: [Callback, Deps, ...RestArgs]) => void) | ((...args: [Callback, Deps]) => void);
