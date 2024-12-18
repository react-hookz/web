import {act, renderHook} from '@testing-library/react-hooks/dom';
import {useRafEffect} from '../../index.js';

describe('useRafEffect', () => {
	const raf = globalThis.requestAnimationFrame;
	const caf = globalThis.cancelAnimationFrame;

	beforeAll(() => {
		jest.useFakeTimers();

		globalThis.requestAnimationFrame = cb => setTimeout(cb);
		globalThis.cancelAnimationFrame = (cb) => {
			clearTimeout(cb);
		};
	});

	afterEach(() => {
		jest.clearAllTimers();
	});

	afterAll(() => {
		jest.useRealTimers();

		globalThis.requestAnimationFrame = raf;
		globalThis.cancelAnimationFrame = caf;
	});

	it('should be defined', () => {
		expect(useRafEffect).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => {
			useRafEffect(() => {}, []);
		});
		expect(result.error).toBeUndefined();
	});

	it('should not run unless animation frame', () => {
		const spy = jest.fn();
		const {rerender} = renderHook(
			(dep) => {
				useRafEffect(spy, [dep]);
			},
			{
				initialProps: 1,
			},
		);

		expect(spy).toHaveBeenCalledTimes(0);

		rerender(2);

		expect(spy).toHaveBeenCalledTimes(0);

		act(() => {
			jest.advanceTimersToNextTimer();
		});

		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should cancel animation frame on unmount', () => {
		const spy = jest.fn();
		const {rerender, unmount} = renderHook(
			(dep) => {
				useRafEffect(spy, [dep]);
			},
			{
				initialProps: 1,
			},
		);

		expect(spy).toHaveBeenCalledTimes(0);

		rerender(2);

		expect(spy).toHaveBeenCalledTimes(0);

		unmount();

		act(() => {
			jest.advanceTimersToNextTimer();
		});

		expect(spy).toHaveBeenCalledTimes(0);
	});
});
