import React from 'react';
import { useMediatedState } from '../..';

export const Example: React.FC = () => {
  const nonLetterRe = /[^a-z]+/gi;
  const [state, setState] = useMediatedState('', (val: string) => val.replaceAll(nonLetterRe, ''));

  return (
    <div>
      <div>Below input will only receive letters</div>
      <input type="text" value={state} onChange={(ev) => setState(ev.currentTarget.value)} />
    </div>
  );
};
