import * as React from 'react';
import { useAsync, useMountEffect } from '../..';

export function Example() {
	const [state, actions] = useAsync(
		() =>
			new Promise<string>((resolve) => {
				setTimeout(() => {
					resolve('react-hookz is awesome!');
				}, 3000);
			}),
		'react-hookz is'
	);

	useMountEffect(actions.execute);

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
				<button
					type="button"
					onClick={() => {
						actions.reset();
						// eslint-disable-next-line @typescript-eslint/no-floating-promises
						actions.execute();
					}}>
					reset
				</button>{' '}
				<button
					type="button"
					onClick={() => {
						// eslint-disable-next-line @typescript-eslint/no-floating-promises
						actions.execute();
					}}>
					execute
				</button>
			</div>
		</div>
	);
}
