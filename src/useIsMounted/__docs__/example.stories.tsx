import * as React from 'react';
import { useIsMounted, useMountEffect, useToggle } from '../../index.js';

export function Example() {
	const [isToggled, toggle] = useToggle(false);

	function ToggledComponent() {
		const isMounted = useIsMounted();

		// As you can see, below effect has no dependencies, it will be executed
		// anyway, but alert will be displayed only in case component persist mounted
		useMountEffect(() => {
			setTimeout(() => {
				if (isMounted()) {
					// eslint-disable-next-line no-alert
					alert('Component was not unmounted!');
				}
			}, 5000);
		});

		return (
			<p>
				This component will display an alert 5 seconds after mount.
				<br />
				Unmounting the component will prevent it.
			</p>
		);
	}

	return (
		<div>
			{!isToggled && (
				<div>
					Because the example component displays an alert without interaction, it is initially
					unmounted.
				</div>
			)}
			<button
				type="button"
				onClick={() => {
					toggle();
				}}>
				Toggle example component {isToggled ? 'off' : 'on'}
			</button>{' '}
			{isToggled && <ToggledComponent />}
		</div>
	);
}
