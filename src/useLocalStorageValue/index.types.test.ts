import {expectTypeOf} from 'vitest';
import {useLocalStorageValue} from './index.js';

declare const dynamicFlag: boolean;

/**
 * Type-level regression suite -- see `useStorageValue/index.types.test.ts` for
 * the rationale. The wrapper declares its own overloads, so it needs its own
 * assertions: a change to `useStorageValue` alone cannot keep it honest.
 */
export function useLocalStorageValueTypes(): void {
	expectTypeOf(useLocalStorageValue<string>('key').value).toEqualTypeOf<string>();
	expectTypeOf(useLocalStorageValue('key', {defaultValue: 'default'}).value).toEqualTypeOf<string>();
	expectTypeOf(useLocalStorageValue<string>('key', {defaultValue: 'default'}).value).toEqualTypeOf<string>();
	expectTypeOf(useLocalStorageValue<string>('key', {initializeWithValue: true}).value).toEqualTypeOf<string>();
	expectTypeOf(useLocalStorageValue<string>('key', {initializeWithValue: undefined}).value).toEqualTypeOf<string>();

	expectTypeOf(useLocalStorageValue<string>('key', {initializeWithValue: false}).value).toEqualTypeOf<
		string | undefined
	>();
	expectTypeOf(useLocalStorageValue('key', {defaultValue: 'default', initializeWithValue: false}).value).toEqualTypeOf<
		string | undefined
	>();
	expectTypeOf(useLocalStorageValue<string>('key', {initializeWithValue: dynamicFlag}).value).toEqualTypeOf<
		string | undefined
	>();

	expectTypeOf(useLocalStorageValue<string, string, true>('key').value).toEqualTypeOf<string>();
	expectTypeOf(useLocalStorageValue<string, string, false>('key').value).toEqualTypeOf<string | undefined>();
}
