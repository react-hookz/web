import React from 'react';
import { useRerender, useRenderCount } from '../..';

export function Example() {
  const renders = useRenderCount();
  const rerender = useRerender();

  return (
    <div>
      <div>This component has rendered {renders} time(s)</div>
      <br />
      <button type="button" onClick={rerender}>
        Rerender
      </button>
    </div>
  );
}
