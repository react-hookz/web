import * as React from 'react';
import { useState } from 'react';
import { useRerender, useMountEffect } from '../..';

export const Example: React.FC = () => {
  const [count, setCount] = useState(0);
  const rerender = useRerender();

  useMountEffect(() => {
    setCount((i) => i + 1);
  });

  return (
    <div>
      <div>useEffectOnce has run {count} time(s)</div>
      <button
        onClick={() => {
          rerender();
        }}>
        Rerender component
      </button>
    </div>
  );
};
