import * as React from 'react';
import { useAsync } from '../..';

export const Example: React.FC = () => {
  const [state, actions] = useAsync(
    () =>
      new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve('react-hookz is awesome!');
        }, 3000);
      }),
    []
  );

  return (
    <div>
      <div>
        <em>Async function will resolve after 3 seconds of wait</em>
      </div>
      <br />
      <div>promise status: {state.status}</div>
      <div>current value: {state.result ?? 'undefined'}</div>
      <br />
      <div>
        <button onClick={actions.reset}>reset</button>{' '}
        <button onClick={actions.execute}>execute</button>
      </div>
    </div>
  );
};
