import * as React from 'react';
import {useToggle} from '../../index.js';

export function Example() {
	const [isToggled, toggle] = useToggle(true);

	return (
		<div>
			<div>{isToggled ? 'The toggle is on' : 'The toggle is off'}</div>
			<button type='button' onClick={toggle}>
				Toggle
			</button>
		</div>
	);
}
