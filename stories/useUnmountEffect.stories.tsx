import * as React from 'react';
import { useUnmountEffect, useToggle } from '../src';

const ToggledComponent: React.FC = () => {
  // eslint-disable-next-line no-alert
  useUnmountEffect(() => alert('UNMOUNTED'));

  return <p>Unmount me</p>;
};

export const Example: React.FC = () => {
  const [isToggled, toggle] = useToggle(true);

  return (
    <div>
      <button
        onClick={() => {
          toggle();
        }}>
        Toggle component {isToggled ? 'off' : 'on'}
      </button>{' '}
      {isToggled && <ToggledComponent />}
    </div>
  );
};
