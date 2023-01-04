import React from 'react';
import { useRerender, useRenderCount } from '../..';

export const Example: React.FC = () => {
  const renders = useRenderCount();
  const rerender = useRerender();

  return (
    <div>
      <div>This component has rendered {renders} time(s)</div>
      <br />
      <button onClick={rerender}>Rerender</button>
    </div>
  );
};
