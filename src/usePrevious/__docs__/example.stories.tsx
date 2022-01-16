import React, { useState } from 'react';
import { usePrevious } from '../..';

export const Example: React.FC = () => {
  const [value, setValue] = useState(0);
  const [unrelatedValue, setUnrelatedValue] = useState(0);
  const previousValue = usePrevious(value);

  const increment = () => setValue((v) => v + 1);
  const decrement = () => setValue((v) => v - 1);
  const triggerUnrelatedRerender = () => setUnrelatedValue((v) => v + 1);

  return (
    <div>
      <span>Current value: {value}</span>

      <div style={{ margin: '1rem 0' }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <button onClick={increment}>increment</button>
          <button onClick={decrement}>decrement</button>
        </div>

        <button onClick={triggerUnrelatedRerender}>
          trigger unrelated rerender - {unrelatedValue}
        </button>
      </div>

      <div>Previous value: &quot;{previousValue ?? 'undefined'}&quot;</div>
    </div>
  );
};
