import * as React from 'react';
import { useToggle, useVibrate } from '#root/index.js';

export function Example() {
	const [doVibrate, setDoVibrate] = useToggle(false);

	useVibrate(
		doVibrate,
		[100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100],
		true
	);

	return (
		<div>
			<button
				type="button"
				onClick={() => {
					setDoVibrate();
				}}>
				{doVibrate ? 'Stop' : 'Start'} vibration
			</button>
		</div>
	);
}
