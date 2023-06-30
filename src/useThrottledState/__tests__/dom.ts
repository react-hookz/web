import { renderHook, act } from '@testing-library/react-hooks/dom';
import { useThrottledState } from '../..';

describe('useThrottledState', () => {
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
		expect(useThrottledState).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useThrottledState('', 200));
		expect(result.error).toBeUndefined();
	});

	it('should throttle set state', () => {
		const { result } = renderHook(() => useThrottledState('', 200, true));

		expect(result.current[0]).toBe('');
		act(() => {
			result.current[1]('hello world!');
		});
		expect(result.current[0]).toBe('hello world!');

		result.current[1]('foo');
		result.current[1]('bar');
		expect(result.current[0]).toBe('hello world!');
		jest.advanceTimersByTime(200);
		act(() => {
			result.current[1]('baz');
		});
		expect(result.current[0]).toBe('baz');
	});
});
