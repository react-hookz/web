import React, { type ComponentProps, useState } from 'react';
import { useThrottledCallback } from '../..';

export function Example() {
  const [state, setState] = useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useThrottledCallback<
    NonNullable<ComponentProps<'input'>['onChange']>
  >(
    (ev) => {
      setState(ev.target.value);
    },
    [],
    500
  );

  return (
    <div>
      <div>Below state will update no more than once every 500ms</div>
      <br />
      <div>The input`s value is: {state}</div>
      <input type="text" onChange={handleChange} />
    </div>
  );
}
