import * as React from 'react';
import { useState } from 'react';
import { useRerender, useUpdateEffect } from '../src';

export const Example: React.FC<{ initialCount: number }> = ({ initialCount = 5 }) => {
  const [count, setCount] = useState(initialCount);
  const [isUpdated, setUpdated] = useState(false);
  const rerender = useRerender();

  useUpdateEffect(() => {
    setUpdated(true);
  }, [count]);

  return (
    <div>
      <div>
        Is counter updated:
        {isUpdated ? 'yes' : 'no'}
      </div>
      <button
        onClick={() => {
          setCount((i) => i + 1);
        }}>
        Increment counter [{count}]
      </button>{' '}
      <button
        onClick={() => {
          rerender();
        }}>
        Just rerender
      </button>
    </div>
  );
};
