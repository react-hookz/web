import { useCallback } from 'react';
import { useIsMounted } from '../useIsMounted/useIsMounted';

export type UsePromise = () => <T>(promise: Promise<T>) => Promise<T>;

export const usePromise: UsePromise = () => {
  const isMounted = useIsMounted();
  return useCallback(
    <T>(promise: Promise<T>) =>
      new Promise<T>((resolve, reject) => {
        const onResolve = (resolution: T) => {
          return isMounted() && resolve(resolution);
        };
        const onReject = (rejection: T) => {
          return isMounted() && reject(rejection);
        };

        // eslint-disable-next-line promise/catch-or-return
        promise.then(onResolve, onReject);
      }),
    [isMounted]
  );
};
