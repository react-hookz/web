import React, { useState } from 'react';
import { usePrevious } from '../src';

export const Example: React.FC = () => {
  const [val, setVal] = useState(0);
  const prevVal = usePrevious(val);

  return (
    <div>
      <span>Current value: {val}</span>{' '}
      <button
        onClick={() => {
          setVal((v) => v + 1);
        }}>
        increment
      </button>{' '}
      <button
        onClick={() => {
          setVal((v) => v - 1);
        }}>
        decrement
      </button>
      <div>Previous value: &quot;{prevVal ?? 'undefined'}&quot;</div>
    </div>
  );
};
