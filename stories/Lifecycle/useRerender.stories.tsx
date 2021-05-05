import * as React from 'react';
import { useRef } from 'react';
import { useRerender } from '../../src';

export const Example: React.FC = () => {
  const count = useRef(0);
  const rerender = useRerender();

  count.current += 1;

  return (
    <div>
      <div>This component has rendered {count.current} times</div>
      <button
        onClick={() => {
          rerender();
        }}>
        Rerender
      </button>
    </div>
  );
};
