import * as React from 'react';
import { useRerender, useLogger } from '../..';

export const Example: React.FC = () => {
  const rerender = useRerender();

  useLogger('Demo', {});

  return (
    <div>
      <div>Check your console for useLogger logs</div>
      <button
        onClick={() => {
          rerender();
        }}>
        Rerender component
      </button>
    </div>
  );
};
