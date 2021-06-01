import * as React from 'react';
import { useState } from 'react';
import { useRerender, useUpdateEffect } from '../..';

export const Example: React.FC = () => {
  const [count, setCount] = useState(1);
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
