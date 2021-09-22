import * as React from 'react';
import { useAsyncAbortable, useMountEffect } from '../..';

export const Example: React.FC = () => {
  const [state, actions, meta] = useAsyncAbortable(
    (signal) =>
      new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          if (signal.aborted) {
            reject(new Error('Aborted!'));
          } else {
            resolve('react-hookz is awesome!');
          }
        }, 5000);
      }),
    'react-hookz is'
  );

  useMountEffect(actions.execute);

  return (
    <div>
      <div>
        <em>
          Async function will resolve after 5 seconds of wait. In case of abort - promise will be
          rejected.
        </em>
      </div>
      <br />
      <div>promise status: {state.status}</div>
      <div>current value: {state.result ?? 'undefined'}</div>
      <div>error: {state.error ? state.error.message : 'undefined'}</div>
      <br />
      <div>
        <button onClick={actions.abort} disabled={!meta.abortController}>
          abort
        </button>{' '}
        <button
          onClick={() => {
            actions.reset();
            actions.execute();
          }}>
          reset & execute
        </button>{' '}
        <button onClick={actions.execute}>execute</button>
      </div>
    </div>
  );
};
