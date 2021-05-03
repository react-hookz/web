import React from 'react';
import { useNetworkState } from '../src/useNetworkState';

export const Example: React.FC = () => {
  const onlineState = useNetworkState();

  return (
    <div>
      <div>Your current internet connection state:</div>
      <pre>{JSON.stringify(onlineState, null, 2)}</pre>
    </div>
  );
};
