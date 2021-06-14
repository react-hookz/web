import React, { useState } from 'react';
import { useThrottleCallback } from '../..';

export const Example: React.FC = () => {
  const [state, setState] = useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useThrottleCallback(
    (ev) => {
      setState(ev.target.value);
    },
    500,
    []
  );

  return (
    <div>
      <div>Below state will update no more than once every 500ms</div>
      <br />
      <div>The input`s value is: {state}</div>
      <input type="text" onChange={handleChange} />
    </div>
  );
};
