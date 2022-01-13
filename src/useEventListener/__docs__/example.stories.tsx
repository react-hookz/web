import * as React from 'react';
import { useState } from 'react';
import { useEventListener, useToggle } from '../..';

export const Example: React.FC = () => {
  const [state, setState] = useState<Date>();
  const [mounted, toggleMounted] = useToggle(true);

  // eslint-disable-next-line react/no-unstable-nested-components
  const ToggledComponent = () => {
    useEventListener(
      window,
      'mousemove',
      () => {
        setState(new Date());
      },
      { passive: true }
    );

    return <div>child component is mounted</div>;
  };

  return (
    <div>
      <div>
        Below state is update on window&apos;s `mousemove` event.
        <br />
        You can unmount child component to ensure that event is unsubscribed when component
        unmounted.
      </div>

      <br />
      <div>{state ? `mouse last moved: ${state.toString()}` : 'mouse not moved yet'}</div>

      <br />
      <div>
        {mounted && <ToggledComponent />}
        <button onClick={() => toggleMounted()}>toggle component</button>
      </div>
    </div>
  );
};
