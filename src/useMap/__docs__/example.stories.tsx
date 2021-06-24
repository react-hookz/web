/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import { useMap } from '../..';

export const Example: React.FC = () => {
  const map = useMap<string, string | Date>([['@react-hooks', 'is awesome']]);

  return (
    <div>
      <button onClick={() => map.set('@react-hooks', 'is awesome')}>set '@react-hooks'</button>
      <button onClick={() => map.delete('@react-hooks')} disabled={!map.has('@react-hooks')}>
        remove '@react-hooks'
      </button>
      <button onClick={() => map.set('current date', new Date())}>set 'current date'</button>
      <button onClick={() => map.delete('current date')} disabled={!map.has('current date')}>
        remove 'current date'
      </button>
      <br />
      <pre>{JSON.stringify(Array.from(map), null, 2)}</pre>
    </div>
  );
};
