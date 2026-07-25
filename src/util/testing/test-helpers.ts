import type {ResultValue} from '@ver0/react-hooks-testing';
import {expect} from 'vitest';

/**
 * Helper to assert that a hook result is successful and extract its value.
 *
 * Accepts `undefined` so that indexed renders (`result.all[i]`) can be passed
 * straight in -- a missing render fails the assertion instead of the type check.
 */
export function expectResultValue<T>(result: ResultValue<T> | undefined): T {
	expect(result).toBeDefined();
	expect(result?.error).toBeUndefined();

	// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
	return result?.value as T;
}

/**
 * Helper to assert that a mock has produced a result for the given call and
 * extract it.
 */
export function expectCallResult<Result>(mock: {mock: {results: Result[]}}, index = 0): Result {
	const result = mock.mock.results[index];

	expect(result).toBeDefined();

	return result!;
}

/**
 * Helper to assert that a mock has been called at least `index + 1` times and
 * extract the arguments of that call.
 */
export function expectCallArgs<Args extends unknown[]>(mock: {mock: {calls: Args[]}}, index = 0): Args {
	const call = mock.mock.calls[index];

	expect(call).toBeDefined();

	return call!;
}
