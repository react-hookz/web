import React, { useRef } from 'react';
import { useRerender, useSyncedRef } from '../../src';

export const Example: React.FC = () => {
  const ref = useRef(0);
  const syncedRef = useSyncedRef(++ref.current);
  const rerender = useRerender();

  return (
    <div>
      <div>As you may see in source code, ref value updated automatically</div>
      <button onClick={rerender}>Rerender outer component</button>{' '}
      <span>renders: {syncedRef.current}</span>
    </div>
  );
};
