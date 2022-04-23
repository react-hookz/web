import * as React from 'react';
import { useToggle, useVibrate } from '../..';

export const Example: React.FC = () => {
  const [doVibrate, setDoVibrate] = useToggle(false);

  useVibrate(
    doVibrate,
    [100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100],
    true
  );

  return (
    <div>
      <button onClick={() => setDoVibrate()}>{doVibrate ? 'Stop' : 'Start'} vibration</button>
    </div>
  );
};
