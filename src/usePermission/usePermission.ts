import { MutableRefObject, useEffect } from 'react';
import { useSafeState } from '..';
import { off, on } from '../util/misc';

export type IAnyPermissionDescriptor =
  | PermissionDescriptor
  | DevicePermissionDescriptor
  | MidiPermissionDescriptor
  | PushPermissionDescriptor;

export type IUsePermissionState = PermissionState | 'not-requested' | 'requested';

/**
 * Tracks a permission state.
 *
 * @param descriptor Permission request descriptor that passed to `navigator.permissions.query`
 */
export function usePermission(descriptor: IAnyPermissionDescriptor): IUsePermissionState {
  const [state, setState] = useSafeState<IUsePermissionState>('not-requested');

  useEffect(() => {
    const unmount: MutableRefObject<(() => void) | null> = { current: null };

    setState('requested');

    navigator.permissions.query(descriptor).then((status) => {
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
