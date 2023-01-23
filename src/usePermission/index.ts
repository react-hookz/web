import { MutableRefObject, useEffect, useState } from 'react';
import { off, on } from '../util/misc';

export type UsePermissionState = PermissionState | 'not-requested' | 'requested';

/**
 * Tracks a permission state.
 *
 * @param descriptor Permission request descriptor that passed to `navigator.permissions.query`
 */
export function usePermission(descriptor: PermissionDescriptor): UsePermissionState {
  const [state, setState] = useState<UsePermissionState>('not-requested');

  useEffect(() => {
    const unmount: MutableRefObject<(() => void) | null> = { current: null };

    setState('requested');

    // eslint-disable-next-line @typescript-eslint/no-floating-promises,promise/catch-or-return
    navigator.permissions
      .query(descriptor)
      // eslint-disable-next-line promise/always-return
      .then((status): void => {
        const handleChange = () => {
          setState(status.state);
        };

        setState(status.state);
        on(status, 'change', handleChange, { passive: true });

        unmount.current = () => {
          off(status, 'change', handleChange);
        };
      });

    return () => {
      if (unmount.current) {
        unmount.current();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [descriptor.name]);

  return state;
}
