import {renderHook} from '@testing-library/react-hooks/dom';
import {afterAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {useLifecycleLogger} from '../index.js';

describe('useLifecycleLogger', () => {
	const logSpy = vi.spyOn(console, 'log');

	afterAll(() => {
		logSpy.mockRestore();
	});

	beforeEach(() => {
		logSpy.mockReset();
	});

	it('should log whole component lifecycle', () => {
		const {unmount, rerender} = renderHook(
			({deps}) => {
				useLifecycleLogger('TestComponent', deps);
			},
			{initialProps: {deps: [1, 2, 3]}},
		);

		expect(logSpy).toHaveBeenCalledTimes(1);
		expect(logSpy).toHaveBeenCalledWith('TestComponent mounted', [1, 2, 3]);

		rerender({deps: [3, 2, 1]});

		expect(logSpy).toHaveBeenCalledTimes(2);
		expect(logSpy).toHaveBeenCalledWith('TestComponent updated', [3, 2, 1]);

		rerender({deps: [1, 5, 6]});

		expect(logSpy).toHaveBeenCalledTimes(3);
		expect(logSpy).toHaveBeenCalledWith('TestComponent updated', [1, 5, 6]);

		unmount();

		expect(logSpy).toHaveBeenCalledTimes(4);
		expect(logSpy).toHaveBeenCalledWith('TestComponent unmounted');
	});
});
