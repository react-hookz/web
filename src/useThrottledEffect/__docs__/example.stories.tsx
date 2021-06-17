import * as React from 'react';
import { useState } from 'react';
import { useThrottledEffect } from '../..';

const HAS_DIGIT_REGEX = /[\d]/g;

export const Example: React.FC = () => {
  const [state, setState] = useState('');
  const [hasNumbers, setHasNumbers] = useState(false);

  useThrottledEffect(
    () => {
      setHasNumbers(HAS_DIGIT_REGEX.test(state));
    },
    [state],
    200
  );

  return (
    <div>
      <div>Digit check will be performed no more than one every 200ms</div>
      <br />
      <div>{hasNumbers ? 'Input has digits' : 'No digits found in input'}</div>
      <input
        type="text"
        value={state}
        onChange={(ev) => {
          setState(ev.target.value);
        }}
      />
    </div>
  );
};
