import * as React from 'react';
import { useToggle } from '../..';

export const Example: React.FC = () => {
  const [isToggled, toggle] = useToggle(true);

  return (
    <div>
      <div>{isToggled ? 'The toggle is on' : 'The toggle is off'}</div>
      <button
        onClick={() => {
          toggle();
        }}>
        Toggle
      </button>
    </div>
  );
};
