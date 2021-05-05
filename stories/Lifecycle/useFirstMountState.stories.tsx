import * as React from 'react';
import { useFirstMountState, useRerender } from '../../src';

export const Example: React.FC = () => {
  const isFirstMount = useFirstMountState();
  const rerender = useRerender();

  return (
    <div>
      <div>
        {isFirstMount
          ? 'This component just mounted'
          : 'Not first mount, component already been updated'}
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
