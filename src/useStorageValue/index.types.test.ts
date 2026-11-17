import {expectTypeOf} from 'vitest';
import type {NextState} from '../util/resolve-hook-state.js';
import type {UseStorageValueResult} from './index.js';
import {useStorageValue} from './index.js';

declare const storage: Storage;
declare const dynamicFlag: boolean;

/**
 * Type-level regression suite for the `value` field of the hook result.
 *
 * Nothing here runs -- the assertions are checked by the type-check pass of
 * `vp lint`. `undefined` may only appear in `value` when `initializeWithValue`
 * is not known to resolve to `true`, since deferring the first read until
 * effects run is the only case that yields `undefined` to the caller.
 *
 * TypeScript does not infer a trailing type parameter when an earlier one is
 * passed explicitly, so every case below is repeated with an explicit `Type` --
 * that is the shape in which the bug originally surfaced.
 */
export function useStorageValueValueTypes(): void {
	// `initializeWithValue` omitted -- the value is read during the first render.
	expectTypeOf(useStorageValue<string>(storage, 'key').value).toEqualTypeOf<string>();
	expectTypeOf(useStorageValue(storage, 'key', {defaultValue: 'default'}).value).toEqualTypeOf<string>();
	expectTypeOf(useStorageValue<string>(storage, 'key', {defaultValue: 'default'}).value).toEqualTypeOf<string>();

	// Explicit `true` behaves like the omitted case.
	expectTypeOf(
		useStorageValue(storage, 'key', {defaultValue: 'default', initializeWithValue: true}).value,
	).toEqualTypeOf<string>();
	expectTypeOf(useStorageValue<string>(storage, 'key', {initializeWithValue: true}).value).toEqualTypeOf<string>();

	// An explicit `undefined` falls back to the default, so the value is read too.
	expectTypeOf(useStorageValue<string>(storage, 'key', {initializeWithValue: undefined}).value).toEqualTypeOf<string>();

	// Explicit `false` defers the read, so the first render yields `undefined`.
	expectTypeOf(useStorageValue(storage, 'key', {defaultValue: 'default', initializeWithValue: false}).value)
		//
		.toEqualTypeOf<string | undefined>();
	expectTypeOf(useStorageValue<string>(storage, 'key', {initializeWithValue: false}).value).toEqualTypeOf<
		string | undefined
	>();

	// A flag unknown at compile time may turn out to be `false`.
	expectTypeOf(useStorageValue(storage, 'key', {defaultValue: 'default', initializeWithValue: dynamicFlag}).value)
		//
		.toEqualTypeOf<string | undefined>();
	expectTypeOf(useStorageValue<string>(storage, 'key', {initializeWithValue: dynamicFlag}).value).toEqualTypeOf<
		string | undefined
	>();

	// Explicit type arguments keep addressing the same overload they used to.
	expectTypeOf(useStorageValue<string, string, true>(storage, 'key').value).toEqualTypeOf<string>();
	expectTypeOf(useStorageValue<string, string, false>(storage, 'key').value).toEqualTypeOf<string | undefined>();
}

/**
 * `set` receives the value type the hook yields, so an updater callback must not
 * be handed an `undefined` previous state unless the read is deferred.
 */
export function useStorageValueSetTypes(): void {
	expectTypeOf(useStorageValue<string>(storage, 'key').set).parameter(0).toEqualTypeOf<NextState<string, string>>();

	expectTypeOf(useStorageValue<string>(storage, 'key', {initializeWithValue: false}).set)
		.parameter(0)
		.toEqualTypeOf<NextState<string, string | undefined>>();
}

/**
 * The exported result type keeps its three parameters, and instantiating it by
 * hand -- the way a consumer annotates a variable -- resolves the same way.
 */
export function useStorageValueResultTypes(): void {
	expectTypeOf<UseStorageValueResult<string, string, true>['value']>().toEqualTypeOf<string>();
	expectTypeOf<UseStorageValueResult<string, string, false>['value']>().toEqualTypeOf<string | undefined>();
	expectTypeOf<UseStorageValueResult<string, string, boolean>['value']>().toEqualTypeOf<string | undefined>();

	// Without a known `initializeWithValue`, the type stays conservative.
	expectTypeOf<UseStorageValueResult<string>['value']>().toEqualTypeOf<string | undefined>();
}
