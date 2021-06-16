import * as React from 'react';
import { useDebouncedState } from '../..';

export const Example: React.FC = () => {
  const [state, setState] = useDebouncedState('', 300, 500);

  return (
    <div>
      <div>Below state will update 200ms after last change, but at least once every 500ms</div>
      <br />
      <div>The input`s value is: {state}</div>
      <input
        type="text"
        onChange={(ev) => {
          setState(ev.target.value);
        }}
      />
    </div>
  );
};
