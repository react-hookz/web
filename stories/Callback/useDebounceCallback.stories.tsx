import React, { useState } from 'react';
import { useDebounceCallback } from '../../src';

export const Example: React.FC = () => {
  const [state, setState] = useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useDebounceCallback(
    (ev) => {
      setState(ev.target.value);
    },
    500,
    []
  );

  return (
    <div>
      <div>Below state will update 500ms after last change</div>
      <br />
      <div>The input`s value is: {state}</div>
      <input type="text" onChange={handleChange} />
    </div>
  );
};
