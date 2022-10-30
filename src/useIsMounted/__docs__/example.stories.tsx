import * as React from 'react';
import { useIsMounted, useMountEffect, useToggle } from '../..';

export const Example: React.FC = () => {
  const [isToggled, toggle] = useToggle(false);

  // eslint-disable-next-line react/no-unstable-nested-components
  const ToggledComponent: React.FC = () => {
    const isMounted = useIsMounted();

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
      {!isToggled && (
        <div>
          As example component displays alert without interaction - it is initially unmounted.
        </div>
      )}
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
