import {act, renderHook} from '@testing-library/react-hooks/dom';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {usePermission} from '../index.js';

describe('usePermission', () => {
	const querySpy = vi.fn(
		() =>
			new Promise((resolve) => {
				setTimeout(() => {
					resolve({state: 'prompt'} as PermissionStatus);
				}, 1);
			}),
	);
	const initialPermissions = navigator.permissions;

	beforeAll(() => {
		vi.useFakeTimers();

		(globalThis.navigator.permissions as any) = {query: querySpy};
	});

	afterEach(() => {
		vi.clearAllTimers();
		querySpy.mockClear();
	});

	afterAll(() => {
		vi.useRealTimers();
		(globalThis.navigator.permissions as any) = initialPermissions;
	});

	it('should be defined', () => {
		expect(usePermission).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => usePermission({name: 'geolocation'}));
		expect(result.error).toBeUndefined();
	});

	it('should have `not-requested` state initially', () => {
		const {result} = renderHook(() => usePermission({name: 'geolocation'}));
		expect(result.all[0]).toBe('not-requested');
	});

	it('should have `requested` state initially', () => {
		const {result} = renderHook(() => usePermission({name: 'geolocation'}));
		expect(result.current).toBe('requested');
	});

	it('should request permission state from `navigator.permissions.query`', () => {
		renderHook(() => usePermission({name: 'geolocation'}));
		expect(querySpy).toHaveBeenCalledWith({name: 'geolocation'});
	});

	it('should have permission state on promise resolve', async () => {
		const {result, waitForNextUpdate} = renderHook(() => usePermission({name: 'geolocation'}));

		act(() => {
			vi.advanceTimersByTime(1);
		});

		await waitForNextUpdate();
		expect(result.current).toBe('prompt');
	});

	it('should update hook state on permission state change', async () => {
		querySpy.mockImplementation(
			() =>
				new Promise((resolve) => {
					setTimeout(() => {
						const status = {
							state: 'prompt',
							addEventListener(_n: any, listener: any) {
								status.state = 'granted';
								// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-return
								setTimeout(() => listener(), 1);
							},
						};

						resolve(status);
					}, 1);
				}),
		);
		const {result, waitForNextUpdate} = renderHook(() => usePermission({name: 'geolocation'}));

		act(() => {
			vi.advanceTimersByTime(1);
		});
		await waitForNextUpdate();
		expect(result.current).toBe('prompt');

		act(() => {
			vi.advanceTimersByTime(1);
		});
		expect(result.current).toBe('granted');
	});
});
