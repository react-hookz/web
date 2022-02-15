import * as React from 'react';
import { useRerender } from '../..';
import { useLogger } from '../useLogger';

export const Example: React.FC = () => {
  const rerender = useRerender();

  useLogger('Demo', [], 'test');

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
