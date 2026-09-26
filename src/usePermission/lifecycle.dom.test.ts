import {act, renderHook} from '@ver0/react-hooks-testing';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {usePermission} from './index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

function pendingQuery() {
	let resolveQuery!: (status: PermissionStatus) => void;
	const promise = new Promise<PermissionStatus>((resolve) => {
		resolveQuery = resolve;
	});
	return {promise, resolve: resolveQuery};
}

function permissionStatus(state: PermissionState): PermissionStatus {
	return Object.assign(new EventTarget(), {state, name: 'geolocation', onchange: null});
}

describe('usePermission query lifecycle', () => {
	const query = vi.fn<(descriptor: PermissionDescriptor) => Promise<PermissionStatus>>();

	beforeEach(() => {
		query.mockReset();
		vi.stubGlobal('navigator', {permissions: {query}});
	});

	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it('does not subscribe when a query resolves after unmount', async () => {
		const pending = pendingQuery();
		const status = permissionStatus('granted');
		const subscribe = vi.spyOn(status, 'addEventListener');
		query.mockReturnValue(pending.promise);
		const {unmount} = await renderHook(() => usePermission({name: 'geolocation'}));

		await unmount();
		await act(async () => {
			pending.resolve(status);
		});

		expect(subscribe).not.toHaveBeenCalled();
	});

	it('ignores an older query that resolves after the descriptor changes', async () => {
		const oldQuery = pendingQuery();
		const newQuery = pendingQuery();
		const oldStatus = permissionStatus('denied');
		const newStatus = permissionStatus('granted');
		const subscribe = vi.spyOn(oldStatus, 'addEventListener');
		query.mockReturnValueOnce(oldQuery.promise).mockReturnValueOnce(newQuery.promise);
		let name: PermissionName = 'geolocation';
		const {result, rerender} = await renderHook(() => usePermission({name}));

		name = 'notifications';
		await rerender();
		await act(async () => {
			newQuery.resolve(newStatus);
		});
		expect(expectResultValue(result)).toBe('granted');
		await act(async () => {
			oldQuery.resolve(oldStatus);
		});

		expect(expectResultValue(result)).toBe('granted');
		expect(subscribe).not.toHaveBeenCalled();
	});

	it('removes a resolved query listener on unmount', async () => {
		const status = permissionStatus('prompt');
		const subscribe = vi.spyOn(status, 'addEventListener');
		const unsubscribe = vi.spyOn(status, 'removeEventListener');
		query.mockResolvedValue(status);
		const {result, unmount} = await renderHook(() => usePermission({name: 'geolocation'}));
		expect(expectResultValue(result)).toBe('prompt');
		expect(subscribe).toHaveBeenCalledOnce();

		await unmount();

		expect(unsubscribe).toHaveBeenCalledOnce();
	});
});
