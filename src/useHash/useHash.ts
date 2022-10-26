import { useCallback, useEffect, useState } from 'react';

import { isBrowser } from '../util/const';

/**
 * React sensor hook that tracks browser’s location hash.
 */
export const useHash = (): [string, (hash: string) => void] => {
  const [hash, setHashState] = useState(isBrowser ? window.location.hash : '');

  useEffect(() => {
    const onHashChange = () => setHashState(window.location.hash);
    window.addEventListener('hashchange', onHashChange);

    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const setHash = useCallback((newHash: string) => {
    if (isBrowser) {
      window.location.hash = newHash;
    }
  }, []);

  return [hash, setHash];
};
