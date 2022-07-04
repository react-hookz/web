import * as React from 'react';
import { useControlledRerenderState, useToggle } from '../..';

export const Example: React.FC = () => {
  const [state, setState] = useControlledRerenderState(0);
  const [doRerender, toggleDoRerender] = useToggle(true);

  return (
    <div>
      <div>State: {state}</div>
      <p>
        <button
          onClick={() => {
            setState((s) => s + 1, doRerender);
          }}>
          Increment (+1)
        </button>{' '}
        <button
          onClick={() => {
            toggleDoRerender();
          }}>
          {doRerender ? 'Disable' : 'Enable'} re-rendering on state set
        </button>
      </p>
    </div>
  );
};
