import * as React from 'react';
import { useControlledRerenderState, useToggle } from '../..';

export function Example() {
	const [state, setState] = useControlledRerenderState(0);
	const [doRerender, toggleDoRerender] = useToggle(true);

	return (
		<div>
			<div>State: {state}</div>
			<p>
				<button
					type="button"
					onClick={() => {
						setState((s) => s + 1, doRerender);
					}}>
					Increment (+1)
				</button>{' '}
				<button
					type="button"
					onClick={() => {
						toggleDoRerender();
					}}>
					{doRerender ? 'Disable' : 'Enable'} re-rendering on state set
				</button>
			</p>
		</div>
	);
}
