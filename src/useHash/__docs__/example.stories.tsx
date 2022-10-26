import React, { useEffect } from 'react';

import { useHash } from '../useHash';

export const Example = (): JSX.Element => {
  const [hash, setHash] = useHash();

  useEffect(() => {
    setHash('#/path/to/page?userId=123');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h5>window.location.hash:</h5>
      <div>
        <pre>{window.location.hash}</pre>
      </div>
      <h5>Edit hash:</h5>
      <input style={{ width: '100%' }} value={hash} onChange={(e) => setHash(e.target.value)} />
    </div>
  );
};
