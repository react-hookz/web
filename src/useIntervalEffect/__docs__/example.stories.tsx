import * as React from 'react';
import { useState } from 'react';
import { useIntervalEffect, useToggle } from '../..';

export const Example: React.FC = () => {
  const [state, setState] = useState<Date>();
  const [enabled, toggleEnabled] = useToggle();

  useIntervalEffect(
    () => {
      setState(new Date());
    },
    enabled ? 1000 : undefined
  );

  return (
    <div>
      Last interval invocation: {state?.toString()}
      <br />
      <button
        onClick={() => {
          toggleEnabled();
        }}>
        {enabled ? 'disable' : 'enable'} interval
      </button>
    </div>
  );
};
