import {renderHook} from '@testing-library/react-hooks/server';
import {useTimeoutEffect} from '../../index.js';

describe('useTimeoutEffect', () => {
	beforeAll(() => {
		jest.useFakeTimers();
	});

	beforeEach(() => {
		jest.clearAllTimers();
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	it('should be defined', () => {
		expect(useTimeoutEffect).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useTimeoutEffect(() => {}, 123));
		expect(result.error).toBeUndefined();
	});

	it('should not invoke callback after timeout', () => {
		const spy = jest.fn();
		renderHook(() => useTimeoutEffect(spy, 100));

		jest.advanceTimersByTime(100);
		expect(spy).not.toHaveBeenCalled();
	});
});
