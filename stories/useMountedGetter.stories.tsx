import * as React from 'react';
import { useMountedGetter, useMountEffect, useToggle } from '../src';

export const Example: React.FC = () => {
  const [isToggled, toggle] = useToggle(true);

  const ToggledComponent: React.FC = () => {
    const isMounted = useMountedGetter();

    // As you can see, below effect has no dependencies, it will be executed
    // anyway, but alert will be displayed only in case component persist mounted
    useMountEffect(() => {
      setTimeout(() => {
        if (isMounted()) {
          // eslint-disable-next-line no-alert
          alert('Component was not unmounted!');
        }
      }, 5000);
    });

    return (
      <p>
        This component will generate alert 5 seconds after mount.
        <br />
        Unmount will prevent it.
      </p>
    );
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
