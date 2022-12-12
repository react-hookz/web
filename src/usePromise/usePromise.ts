import { useCallback } from 'react';
import { useIsMounted } from '../useIsMounted/useIsMounted';
import { noop } from '../util/const';

export type UsePromise = () => <T>(promise: Promise<T>) => Promise<T>;

export const usePromise: UsePromise = () => {
  const isMounted = useIsMounted();

  return useCallback(
    <T>(promise: Promise<T>) =>
      new Promise<T>((resolve, reject) => {
        const onResolve = (resolution: T) => (isMounted() ? resolve(resolution) : noop);

        const onReject = (rejection: unknown) => (isMounted() ? reject(rejection) : noop);

        // eslint-disable-next-line promise/catch-or-return
        promise.then(onResolve, onReject);
      }),
    [isMounted]
  );
};
