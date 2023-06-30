import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useRafState } from '../..';

describe('useRafState', () => {
	const raf = global.requestAnimationFrame;
	const caf = global.cancelAnimationFrame;

	beforeAll(() => {
		jest.useFakeTimers();

		global.requestAnimationFrame = (cb) => setTimeout(cb);
		global.cancelAnimationFrame = (cb) => {
			clearTimeout(cb);
		};
	});

	afterEach(() => {
		jest.clearAllTimers();
	});

	afterAll(() => {
		jest.useRealTimers();

		global.requestAnimationFrame = raf;
		global.cancelAnimationFrame = caf;
	});

	it('should be defined', () => {
		expect(useRafState).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useRafState());
		expect(result.error).toBeUndefined();
	});

	it('should not update state unless animation frame', () => {
		const { result } = renderHook(() => useRafState<number>());

		act(() => {
			result.current[1](1);
			result.current[1](2);
			result.current[1](3);
		});

		expect(result.current[0]).toBeUndefined();

		act(() => {
			jest.advanceTimersToNextTimer();
		});

		expect(result.current[0]).toBe(3);
		expect(result.all.length).toBe(2);
	});

	it('should cancel animation frame on unmount', () => {
		const { result, unmount } = renderHook(() => useRafState<number>());

		act(() => {
			result.current[1](1);
			result.current[1](2);
			result.current[1](3);
		});

		unmount();

		expect(result.current[0]).toBeUndefined();
	});
});
