import * as React from 'react';
import { useToggle, useUnmountEffect } from '../../src';

export const Example: React.FC = () => {
  const [isToggled, toggle] = useToggle(false);

  const ToggledComponent: React.FC = () => {
    // eslint-disable-next-line no-alert
    useUnmountEffect(() => alert('UNMOUNTED'));

    return <p>Unmount me</p>;
  };

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
