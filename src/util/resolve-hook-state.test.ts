import {describe, expect, it, vi} from 'vitest';
import {resolveHookState} from '../index.js';

describe('resolveHookState', () => {
	it('should be defined', () => {
		expect(resolveHookState).toBeDefined();
	});

	it('should return value itself if it is not function', () => {
		expect(resolveHookState(123)).toBe(123);

		const object = {foo: 'bar'};
		expect(resolveHookState(object)).toBe(object);
	});

	it('should only call passed function with provided arguments', () => {
		// state initializer
		const initializer = vi.fn(() => 123);
		expect(resolveHookState(initializer)).toBe(123);
		expect(initializer).toHaveBeenCalledTimes(1);
		expect(initializer.mock.calls[0]).toHaveLength(0);

		// state updater
		const updater = vi.fn((previousState?: number) => (previousState ?? 0) + 1);
		expect(resolveHookState(updater, 1)).toBe(2);
		expect(updater).toHaveBeenCalledTimes(1);
		expect(updater.mock.calls[0]).toHaveLength(1);

		// function suitable for both initializer and updater
		expect(resolveHookState(updater)).toBe(1);
		expect(updater).toHaveBeenCalledTimes(2);
		expect(updater.mock.calls[1]).toHaveLength(0);
	});
});
