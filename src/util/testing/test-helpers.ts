import type {ResultValue} from '@ver0/react-hooks-testing';
import {expect} from 'vitest';

/**
 * Helper to assert that a hook result is successful and extract its value.
 */
export function expectResultValue<T>(result: ResultValue<T>) {
	expect(result.error).toBeUndefined();

	// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
	return result.value as T;
}
