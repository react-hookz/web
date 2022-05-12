import React from 'react';
import { useCounter } from '../..';

export const Example: React.FC = () => {
  const [min, { inc: incMin, dec: decMin }] = useCounter(1);
  const [max, { inc: incMax, dec: decMax }] = useCounter(10);
  const [value, { inc, dec, set, reset }] = useCounter(5, max, min);

  return (
    <div>
      <div>
        current: {value} [min: {min}; max: {max}]
      </div>
      <br />
      Current value:
      <button onClick={() => inc()}>Increment</button>
      <button onClick={() => dec()}>Decrement</button>
      <button onClick={() => inc(5)}>Increment (+5)</button>
      <button onClick={() => dec(5)}>Decrement (-5)</button>
      <button onClick={() => set(100)}>Set 100</button>
      <button onClick={() => reset()}>Reset</button>
      <button onClick={() => reset(25)}>Reset (25)</button>
      <br />
      <br />
      Min value:
      <button onClick={() => incMin()}>Increment</button>
      <button onClick={() => decMin()}>Decrement</button>
      <br />
      <br />
      Max value:
      <button onClick={() => incMax()}>Increment</button>
      <button onClick={() => decMax()}>Decrement</button>
    </div>
  );
};
