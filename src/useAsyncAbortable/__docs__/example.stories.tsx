import * as React from 'react';
import { useAsyncAbortable, useMountEffect } from '../../index.js';

export function Example() {
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
					Async function will resolve after 5 seconds. If the function is aborted, the promise will
					be rejected.
				</em>
			</div>
			<br />
			<div>promise status: {state.status}</div>
			<div>current value: {state.result ?? 'undefined'}</div>
			<div>error: {state.error ? state.error.message : 'undefined'}</div>
			<br />
			<div>
				<button type="button" disabled={!meta.abortController} onClick={actions.abort}>
					abort
				</button>{' '}
				<button
					type="button"
					onClick={() => {
						void actions.reset();

						void actions.execute();
					}}>
					reset & execute
				</button>{' '}
				<button
					type="button"
					onClick={() => {
						void actions.execute();
					}}>
					execute
				</button>
			</div>
		</div>
	);
}
