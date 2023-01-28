import * as React from 'react';
import { useStateRef } from '../..';

export const Example: React.FC = () => {
  const [stateRef, setStateRef] = useStateRef((node) => ({
    height: node?.clientHeight ?? 0,
    width: node?.clientWidth ?? 0,
  }));

  return (
    <div
      ref={setStateRef}
      style={{
        minWidth: 100,
        minHeight: 100,
        resize: 'both',
        overflow: 'auto',
        background: 'red',
      }}>
      <pre>{JSON.stringify(stateRef, undefined, 2)}</pre>
    </div>
  );
};
