import * as React from 'react';

import { useFreezeProp, useRerender } from '../..';

const displayJson = (object: Record<PropertyKey, unknown>) => JSON.stringify(object, undefined, 2);
export const Example: React.FC = () => {
  const prop = { digit: Math.random() };

  const rerender = useRerender();
  const freezeProp = useFreezeProp(prop);

  return (
    <div>
      <pre>{displayJson({ prop })}</pre>
      <pre>{displayJson({ freezeProp })}</pre>
      <button onClick={rerender}>rerender</button>
    </div>
  );
};
