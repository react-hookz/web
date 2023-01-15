import * as React from 'react';
import { useFirstMountState, useRerender } from '../..';

export const Example: React.FC = () => {
  const isFirstMount = useFirstMountState();
  const rerender = useRerender();

  return (
    <div>
      <div>{isFirstMount ? 'This is the first render.' : 'This is not the first render.'}</div>
      <button
        onClick={() => {
          rerender();
        }}>
        Rerender component
      </button>
    </div>
  );
};
