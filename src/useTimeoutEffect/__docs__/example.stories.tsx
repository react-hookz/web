import * as React from 'react';
import { useState } from 'react';
import { useTimeoutEffect, useToggle } from '../..';

export const Example: React.FC = () => {
  const [numCalls, setNumCalls] = useState<number>(0);
  const [enabled, toggleEnabled] = useToggle();
  const [timeoutValue, setTimeoutValue] = useState<number>(1000);
  const [cancelled, toggleCancelled] = useToggle();

  let status;
  if (cancelled) {
    status = 'Cancelled';
  } else {
    status = enabled ? 'Enabled' : 'Disabled';
  }

  const [cancel, reset] = useTimeoutEffect(
    () => {
      setNumCalls((n) => n + 1);
    },
    enabled ? timeoutValue : undefined
  );

  React.useEffect(() => {
    setNumCalls(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeoutValue, enabled]);

  return (
    <div>
      Has fired: {numCalls.toString()}
      <br />
      Status: {status}
      <br />
      <input
        placeholder="Timeout value"
        type="number"
        min={0}
        value={timeoutValue}
        onChange={(e) => setTimeoutValue(Number(e.target.value))}
      />
      <button
        onClick={() => {
          toggleEnabled();
          toggleCancelled(false);
        }}>
        {enabled ? 'Disable' : 'Enable'} timeout
      </button>
      <button
        onClick={() => {
          reset();
          toggleCancelled(false);
        }}>
        Reset
      </button>
      <button
        onClick={() => {
          cancel();
          toggleCancelled(enabled && true);
        }}>
        Cancel
      </button>
    </div>
  );
};
