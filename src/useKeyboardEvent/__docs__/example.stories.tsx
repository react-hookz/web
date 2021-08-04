import * as React from 'react';
import { useState } from 'react';
import { useKeyboardEvent } from '../..';

export const Example: React.FC = () => {
  const [list, setList] = useState<string[]>([]);
  useKeyboardEvent(
    () => true,
    (ev) => {
      list.unshift(ev.key);
      setList([...list]);
    },
    [],
    { event: 'keydown', eventOptions: { passive: true } }
  );

  return (
    <div>
      <p>You have pressed</p>
      <ul>
        {list.map((k, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={idx}>{k}</li>
        ))}
      </ul>
    </div>
  );
};
