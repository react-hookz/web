import * as React from 'react';
import { SsrStateProvider, useSsrState, useToggle } from '../..';

export const Example: React.FC = () => {
  const [ssrDisabled, toggleDisabled] = useToggle(false, true);

  // eslint-disable-next-line react/no-unstable-nested-components
  const StateDetector = () => {
    return <span>SSR mode {useSsrState() ? 'enabled' : 'disabled'}</span>;
  };

  return (
    <SsrStateProvider disabled={ssrDisabled}>
      <div>
        <StateDetector />
        {'   '}
        <button onClick={toggleDisabled}>{ssrDisabled ? 'enable' : 'disable'}</button>
      </div>
    </SsrStateProvider>
  );
};
