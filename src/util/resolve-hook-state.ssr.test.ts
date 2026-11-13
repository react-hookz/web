import type {InitialState, NextState} from '../index.js';
import {describe, expect, it} from 'vitest';
import {resolveHookState} from '../index.js';

describe('public hook state types', () => {
	it('should export initializer and updater types from the package root', () => {
		const initialState: InitialState<number> = () => 123;
		const nextState: NextState<number> = (previousState) => previousState + 1;

		expect(resolveHookState(initialState)).toBe(123);
		expect(resolveHookState(nextState, 123)).toBe(124);
	});

	it('should support a different previous state type for mediated updates', () => {
		const nextState: NextState<number, string> = (previousState) => previousState.length;

		expect(resolveHookState(nextState, 'foo')).toBe(3);
	});
});
