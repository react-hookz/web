import * as React from 'react';
import { useRerender, useLifecycleLogger } from '../..';

export const Example: React.FC = () => {
  const rerender = useRerender();
  const dependency = 'test';
  useLifecycleLogger('Demo', [dependency]);

  return (
    <div>
      <div>Check your console for useLifecycleLogger logs</div>
      <button
        onClick={() => {
          rerender();
        }}>
        Rerender component
      </button>
    </div>
  );
};
