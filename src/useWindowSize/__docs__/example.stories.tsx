import * as React from 'react';
import { useWindowSize } from '../..';

export const Example: React.FC = () => {
  const size = useWindowSize();

  return (
    <div>
      Window dimensions:
      <pre>{JSON.stringify(size, null, 2)}</pre>
      <blockquote>
        Note: this example is rendered within an iframe which is smaller than your browser window.
      </blockquote>
    </div>
  );
};
