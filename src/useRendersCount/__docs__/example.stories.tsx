import React, { useState } from 'react';
import { useRendersCount } from '../useRendersCount';

export const Example: React.FC = () => {
  const [count, setCount] = useState(0);
  const rendersCount = useRendersCount();

  return (
    <div>
      <span>Renders count: {rendersCount}</span>
      <br />
      <button onClick={() => setCount(count + 1)}>re-render</button>
    </div>
  );
};
