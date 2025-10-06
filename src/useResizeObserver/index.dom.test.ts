import {renderHook} from '@ver0/react-hooks-testing';
import {afterAll, beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {useResizeObserver} from '../index.js';

describe('useResizeObserver', () => {
	const observeSpy = vi.fn();
	const unobserveSpy = vi.fn();
	const disconnectSpy = vi.fn();

	const ResizeObserverSpy = vi.fn((_cb: (entries: ResizeObserverEntry[]) => void) => ({
		observe: observeSpy,
		unobserve: unobserveSpy,
		disconnect: disconnectSpy,
	}));
	const initialRO = globalThis.ResizeObserver;

	beforeAll(() => {
		vi.stubGlobal('ResizeObserver', ResizeObserverSpy);
		vi.useFakeTimers();
	});

	beforeEach(() => {
		observeSpy.mockClear();
		unobserveSpy.mockClear();
		disconnectSpy.mockClear();
	});

	afterAll(() => {
		globalThis.ResizeObserver = initialRO;
		vi.useRealTimers();
	});

	it('should be defined', async () => {
		expect(useResizeObserver).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useResizeObserver(null, () => {});
		});

		expect(result.error).toBeUndefined();
	});

	it('should create ResizeObserver instance only on first hook render', async () => {
		expect(ResizeObserverSpy).toHaveBeenCalledTimes(1);

		await renderHook(() => {
			useResizeObserver(null, () => {});
		});
		await renderHook(() => {
			useResizeObserver(null, () => {});
		});

		expect(ResizeObserverSpy).toHaveBeenCalledTimes(1);
	});

	it('should subscribe in case ref first was empty but then gained element', async () => {
		const div = document.createElement('div');
		const ref: React.MutableRefObject<Element | null> = {current: null};
		const spy = vi.fn();

		const {rerender} = await renderHook(
			({ref}) => {
				useResizeObserver(ref, spy);
			},
			{
				initialProps: {ref},
			},
		);

		expect(observeSpy).toHaveBeenCalledTimes(0);

		ref.current = div;
		await rerender({ref});

		expect(observeSpy).toHaveBeenCalledTimes(1);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
		const entry = {
			target: div,
			contentRect: {},
			borderBoxSize: {},
			contentBoxSize: {},
		} as unknown as ResizeObserverEntry;

		ResizeObserverSpy.mock.calls[0][0]([entry]);

		expect(spy).not.toHaveBeenCalledWith(entry);

		vi.advanceTimersByTime(1);

		expect(spy).toHaveBeenCalledWith(entry);
	});

	it('should invoke each callback listening same element asynchronously using setTimeout0', async () => {
		const div = document.createElement('div');
		const spy1 = vi.fn();
		const spy2 = vi.fn();

		await renderHook(() => {
			useResizeObserver(div, spy1);
		});
		await renderHook(() => {
			useResizeObserver(div, spy2);
		});

		expect(observeSpy).toHaveBeenCalledTimes(1);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
		const entry = {
			target: div,
			contentRect: {},
			borderBoxSize: {},
			contentBoxSize: {},
		} as unknown as ResizeObserverEntry;

		ResizeObserverSpy.mock.calls[0][0]([entry]);

		expect(spy1).not.toHaveBeenCalledWith(entry);
		expect(spy2).not.toHaveBeenCalledWith(entry);

		vi.advanceTimersByTime(1);

		expect(spy1).toHaveBeenCalledWith(entry);
		expect(spy2).toHaveBeenCalledWith(entry);
	});

	it('should invoke each callback listening different element', async () => {
		const div = document.createElement('div');
		const div2 = document.createElement('div');
		const spy1 = vi.fn();
		const spy2 = vi.fn();

		await renderHook(() => {
			useResizeObserver(div, spy1);
		});
		await renderHook(() => {
			useResizeObserver({current: div2}, spy2);
		});

		expect(observeSpy).toHaveBeenCalledTimes(2);

		// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
		const entry1 = {
			target: div,
			contentRect: {},
			borderBoxSize: {},
			contentBoxSize: {},
		} as unknown as ResizeObserverEntry;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
		const entry2 = {
			target: div2,
			contentRect: {},
			borderBoxSize: {},
			contentBoxSize: {},
		} as unknown as ResizeObserverEntry;

		ResizeObserverSpy.mock.calls[0][0]([entry1, entry2]);

		expect(spy1).not.toHaveBeenCalledWith(entry1);
		expect(spy2).not.toHaveBeenCalledWith(entry2);

		vi.advanceTimersByTime(1);

		expect(spy1).toHaveBeenCalledWith(entry1);
		expect(spy2).toHaveBeenCalledWith(entry2);
	});

	it('should unsubscribe on component unmount', async () => {
		const div = document.createElement('div');
		const spy = vi.fn();
		const {unmount} = await renderHook(() => {
			useResizeObserver(div, spy);
		});

		expect(observeSpy).toHaveBeenCalledTimes(1);
		expect(observeSpy).toHaveBeenCalledWith(div);
		expect(unobserveSpy).toHaveBeenCalledTimes(0);

		await unmount();

		expect(observeSpy).toHaveBeenCalledTimes(1);
		expect(unobserveSpy).toHaveBeenCalledTimes(1);
		expect(unobserveSpy).toHaveBeenCalledWith(div);
	});

	describe('disabled observer', () => {
		it('should not subscribe in case observer is disabled', async () => {
			const div = document.createElement('div');
			const div2 = document.createElement('div');
			const spy1 = vi.fn();
			const spy2 = vi.fn();

			await renderHook(() => {
				useResizeObserver(div, spy1);
			});
			await renderHook(() => {
				useResizeObserver({current: div2}, spy2, false);
			});

			expect(observeSpy).toHaveBeenCalledTimes(1);
		});

		it('should unsubscribe and resubscribe in case of observer toggling', async () => {
			const div = document.createElement('div');
			const spy1 = vi.fn();

			const {rerender} = await renderHook(
				({enabled}) => {
					useResizeObserver(div, spy1, enabled);
				},
				{
					initialProps: {enabled: false},
				},
			);

			expect(observeSpy).toHaveBeenCalledTimes(0);
			expect(unobserveSpy).toHaveBeenCalledTimes(0);

			await rerender({enabled: true});

			expect(observeSpy).toHaveBeenCalledTimes(1);
			expect(unobserveSpy).toHaveBeenCalledTimes(0);

			await rerender({enabled: false});

			expect(observeSpy).toHaveBeenCalledTimes(1);
			expect(unobserveSpy).toHaveBeenCalledTimes(1);
		});
	});
});
