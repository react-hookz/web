import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useDebouncedState } from '#root/index.js';

describe('useDebouncedState', () => {
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
		expect(useDebouncedState).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useDebouncedState(undefined, 200));
		expect(result.error).toBeUndefined();
	});

	it('should debounce state set', () => {
		const { result } = renderHook(() => useDebouncedState<string | undefined>(undefined, 200));

		expect(result.current[0]).toBe(undefined);
		result.current[1]('Hello world!');

		act(() => {
			jest.advanceTimersByTime(199);
		});
		expect(result.current[0]).toBe(undefined);

		act(() => {
			jest.advanceTimersByTime(1);
		});
		expect(result.current[0]).toBe('Hello world!');
	});
});
