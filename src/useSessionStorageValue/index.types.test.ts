import {expectTypeOf} from 'vitest';
import {useSessionStorageValue} from './index.js';

declare const dynamicFlag: boolean;

/**
 * Type-level regression suite -- see `useStorageValue/index.types.test.ts` for
 * the rationale. The wrapper declares its own overloads, so it needs its own
 * assertions: a change to `useStorageValue` alone cannot keep it honest.
 */
export function useSessionStorageValueTypes(): void {
	expectTypeOf(useSessionStorageValue<string>('key').value).toEqualTypeOf<string>();
	expectTypeOf(useSessionStorageValue('key', {defaultValue: 'default'}).value).toEqualTypeOf<string>();
	expectTypeOf(useSessionStorageValue<string>('key', {defaultValue: 'default'}).value).toEqualTypeOf<string>();
	expectTypeOf(useSessionStorageValue<string>('key', {initializeWithValue: true}).value).toEqualTypeOf<string>();
	expectTypeOf(useSessionStorageValue<string>('key', {initializeWithValue: undefined}).value).toEqualTypeOf<string>();

	expectTypeOf(useSessionStorageValue<string>('key', {initializeWithValue: false}).value).toEqualTypeOf<
		string | undefined
	>();
	expectTypeOf(
		useSessionStorageValue('key', {defaultValue: 'default', initializeWithValue: false}).value,
	).toEqualTypeOf<string | undefined>();
	expectTypeOf(useSessionStorageValue<string>('key', {initializeWithValue: dynamicFlag}).value).toEqualTypeOf<
		string | undefined
	>();

	expectTypeOf(useSessionStorageValue<string, string, true>('key').value).toEqualTypeOf<string>();
	expectTypeOf(useSessionStorageValue<string, string, false>('key').value).toEqualTypeOf<string | undefined>();
}
