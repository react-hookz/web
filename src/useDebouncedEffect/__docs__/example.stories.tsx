import * as React from 'react';
import { useState } from 'react';
import { useDebouncedEffect } from '../..';

const HAS_DIGIT_REGEX = /\d/g;

export function Example() {
  const [state, setState] = useState('');
  const [hasNumbers, setHasNumbers] = useState(false);

  useDebouncedEffect(
    () => {
      setHasNumbers(HAS_DIGIT_REGEX.test(state));
    },
    [state],
    200,
    500
  );

  return (
    <div>
      <div>
        Digit check will be performed 200ms after last change, but at least once every 500ms
      </div>
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
}
