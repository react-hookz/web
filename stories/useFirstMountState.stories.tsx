import * as React from 'react';
import { useFirstMountState, useRerender } from '../src';

export const Example: React.FC<{ initialCount: number }> = () => {
  const isFirstMount = useFirstMountState();
  const rerender = useRerender();

  return (
    <div>
      <div>
        {isFirstMount
          ? 'This component is just mounted'
          : 'Not first mount, component already been update'}
      </div>
      <button
        onClick={() => {
          rerender();
        }}>
        Rerender component
      </button>
    </div>
  );
};
