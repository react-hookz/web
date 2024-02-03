import * as React from 'react';
import { useToggle, useUnmountEffect } from '../../index.js';

export function Example() {
	const [isToggled, toggle] = useToggle(false);

	function ToggledComponent() {
		useUnmountEffect(() => {
			// eslint-disable-next-line no-alert
			alert('UNMOUNTED');
		});

		return <p>Unmount me</p>;
	}

	return (
		<div>
			<button
				type="button"
				onClick={() => {
					toggle();
				}}>
				Toggle component {isToggled ? 'off' : 'on'}
			</button>{' '}
			{isToggled && <ToggledComponent />}
		</div>
	);
}
