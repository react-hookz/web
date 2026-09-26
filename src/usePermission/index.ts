import type {RefObject} from 'react';
import {useEffect, useState} from 'react';
import {off, on} from '../util/misc.js';

export type UsePermissionState = PermissionState | 'not-requested' | 'requested';

/**
 * Tracks a permission state. Query results are ignored after unmount or when
 * the permission name changes.
 *
 * @param descriptor Permission request descriptor that passed to `navigator.permissions.query`
 */
export function usePermission(descriptor: PermissionDescriptor): UsePermissionState {
	const [state, setState] = useState<UsePermissionState>('not-requested');

	useEffect(() => {
		let active = true;
		const unmount: RefObject<(() => void) | null> = {current: null};

		setState('requested');

		// eslint-disable-next-line @typescript-eslint/no-floating-promises,promise/catch-or-return
		navigator.permissions
			.query(descriptor)
			// eslint-disable-next-line promise/prefer-await-to-then,promise/always-return
			.then((status): void => {
				if (!active) {
					return;
				}

				const handleChange = () => {
					setState(status.state);
				};

				setState(status.state);
				on(status, 'change', handleChange, {passive: true});

				unmount.current = () => {
					off(status, 'change', handleChange);
				};
			});

		return () => {
			active = false;
			if (unmount.current) {
				unmount.current();
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [descriptor.name]);

	return state;
}
