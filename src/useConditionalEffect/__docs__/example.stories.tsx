import * as React from 'react';
import { useState } from 'react';
import { useConditionalEffect, useToggle } from '../..';

export const Example: React.FC = () => {
  const [isToggled, toggle] = useToggle(false);

  const ToggledComponent: React.FC = () => {
    const [state1, setState1] = useState(2);
    const [state2, setState2] = useState(2);

    useConditionalEffect(
      () => {
        // eslint-disable-next-line no-alert
        alert('COUNTERS VALUES ARE EVEN');
      },
      [state1, state2],
      [state1, state2],
      (conditions) => conditions.every((i) => i && i % 2 === 0)
    );

    return (
      <div>
        <div>Alert will be displayed when both counters values are even</div>
        <div>Effect also invoked on initial mount</div>
        <button
          onClick={() => {
            setState1((i) => i + 1);
          }}>
          increment counter 1 [{state1}]
        </button>{' '}
        <button
          onClick={() => {
            setState2((i) => i + 1);
          }}>
          increment counter 2 [{state2}]
        </button>
      </div>
    );
  };

  if (isToggled) {
    return <ToggledComponent />;
  }

  return (
    <div>
      <div>As example component displays alert right from mount - it is initially unmounted.</div>
      <button onClick={() => toggle()}>Mount example component</button>
    </div>
  );
};
