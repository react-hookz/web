import { renderHook } from '@testing-library/react-hooks/dom';
import { useThrottledEffect } from '../../index.js';

describe('useThrottledEffect', () => {
	beforeAll(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.clearAllTimers();
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	it('should be defined', () => {
		expect(useThrottledEffect).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => {
			useThrottledEffect(() => {}, [], 200);
		});
		expect(result.error).toBeUndefined();
	});

	it('should throttle passed callback', () => {
		const spy = jest.fn();
		const { rerender } = renderHook(
			(dep) => {
				useThrottledEffect(spy, [dep], 200, true);
			},
			{
				initialProps: 1,
			}
		);

		expect(spy).toHaveBeenCalledTimes(1);
		rerender(2);
		rerender(3);
		rerender(4);
		expect(spy).toHaveBeenCalledTimes(1);

		jest.advanceTimersByTime(200);
		expect(spy).toHaveBeenCalledTimes(1);
		rerender(5);
		expect(spy).toHaveBeenCalledTimes(2);
	});
});
