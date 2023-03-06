import { useCallback, useState } from 'react';

import { useSyncedRef } from '../useSyncedRef';

/**
 * Hook with callback which provide access to DOM node reference.
 *
 * @param refCallback Function which call on mount and unmount of component
 * @returns return value of `refCallback` and handler
 */
export const useStateRef = <Node extends HTMLElement | null, StateRef>(
  refCallback: (node: Node) => StateRef
): readonly [StateRef | null, (node: Node) => void] => {
  const [stateRef, setStateRefImpl] = useState<StateRef | null>(null);
  const syncedRefCallback = useSyncedRef(refCallback);

  const setStateRef = useCallback(
    (...params: Parameters<typeof refCallback>) => {
      setStateRefImpl(syncedRefCallback.current(...params));
    },
    [syncedRefCallback]
  );

  return [stateRef, setStateRef] as const;
};
