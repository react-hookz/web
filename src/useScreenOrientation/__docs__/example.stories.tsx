import * as React from 'react';
import { useScreenOrientation } from '../..';

export const Example: React.FC = () => {
  const orientation = useScreenOrientation();

  return (
    <div>
      <div>
        Orientation: <code>{orientation}</code>
      </div>
      <div>
        Render time: <code>{new Date().toLocaleString()}</code>
      </div>
    </div>
  );
};
