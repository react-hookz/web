/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import { useSet } from '../..';

export const Example: React.FC = () => {
  const set = useSet(['@react-hooks', 'is awesome']);

  return (
    <div>
      <button onClick={() => set.add('@react-hooks')} disabled={set.has('@react-hooks')}>
        add '@react-hooks'
      </button>
      <button onClick={() => set.delete('@react-hooks')} disabled={!set.has('@react-hooks')}>
        remove '@react-hooks'
      </button>
      <button onClick={() => set.add('is awesome')} disabled={set.has('is awesome')}>
        add 'is awesome'
      </button>
      <button onClick={() => set.delete('is awesome')} disabled={!set.has('is awesome')}>
        remove 'is awesome'
      </button>
      <br />
      <pre>{JSON.stringify([...set], null, 2)}</pre>
    </div>
  );
};
