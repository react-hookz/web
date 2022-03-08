import React from 'react';
import { useRaf } from '../..';

export const Example: React.FC = () => {
  const elapsed = useRaf(1.5);

  return (
    <div>
      <span>Elapsed: {elapsed}</span>
    </div>
  );
};
