import {act, renderHook} from '@ver0/react-hooks-testing';
import {afterAll, afterEach, beforeAll, describe, expect, it, vi} from 'vitest';
import {usePermission} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

describe('usePermission', () => {
	const querySpy = vi.fn(
		async () =>
			new Promise((resolve) => {
				setTimeout(() => {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
					resolve({state: 'prompt'} as PermissionStatus);
				}, 1);
			}),
	);
	const initialPermissions = navigator.permissions;

	beforeAll(() => {
		vi.useFakeTimers();

		// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
		(globalThis.navigator.permissions as any) = {query: querySpy};
	});

	afterEach(() => {
		vi.clearAllTimers();
		querySpy.mockClear();
	});

	afterAll(() => {
		vi.useRealTimers();
		// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
		(globalThis.navigator.permissions as any) = initialPermissions;
	});

	it('should be defined', async () => {
		expect(usePermission).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => usePermission({name: 'geolocation'}));
		expect(result.error).toBeUndefined();
	});

	it('should have `not-requested` state initially', async () => {
		const {result} = await renderHook(() => usePermission({name: 'geolocation'}));
		expect(expectResultValue(result.all[0])).toBe('not-requested');
	});

	it('should have `requested` state initially', async () => {
		const {result} = await renderHook(() => usePermission({name: 'geolocation'}));
		expect(result.value).toBe('requested');
	});

	it('should request permission state from `navigator.permissions.query`', async () => {
		await renderHook(() => usePermission({name: 'geolocation'}));
		expect(querySpy).toHaveBeenCalledWith({name: 'geolocation'});
	});

	it('should have permission state on promise resolve', async () => {
		const {result} = await renderHook(() => usePermission({name: 'geolocation'}));

		await act(async () => {
			vi.advanceTimersByTime(1);
		});

		expect(result.value).toBe('prompt');
	});

	it('should update hook state on permission state change', async () => {
		querySpy.mockImplementation(
			async () =>
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
		const {result} = await renderHook(() => usePermission({name: 'geolocation'}));

		await act(async () => {
			vi.advanceTimersByTime(1);
		});
		expect(result.value).toBe('prompt');

		await act(async () => {
			vi.advanceTimersByTime(1);
		});
		expect(result.value).toBe('granted');
	});
});
