import * as React from 'react';
import { useDebouncedState } from '../../index.js';

export function Example() {
	const [state, setState] = useDebouncedState('', 300, 500);

	return (
		<div>
			<div>Below state will update 300ms after last change, but at least once every 500ms</div>
			<br />
			<div>The input`s value is: {state}</div>
			<input
				type="text"
				onChange={(ev) => {
					setState(ev.target.value);
				}}
			/>
		</div>
	);
}
