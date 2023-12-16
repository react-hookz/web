import * as React from 'react';
import { useState } from 'react';
import { useEventListener, useToggle } from '#root/index.js';

export function Example() {
	const [state, setState] = useState<Date>();
	const [mounted, toggleMounted] = useToggle(true);

	function ToggledComponent() {
		useEventListener(
			window,
			'mousemove',
			() => {
				setState(new Date());
			},
			{ passive: true }
		);

		return <div>Datetime updating component is mounted.</div>;
	}

	return (
		<div>
			<div>
				The datetime shown below is updated on window&apos;s <code>mousemove</code> event.
				<br />
				You can unmount the datetime updating component by clicking the button below to ensure that
				the event is unsubscribed from when the component unmounts.
			</div>

			<br />
			<div>{state ? `Cursor last moved: ${state.toString()}.` : 'Cursor not moved yet.'}</div>

			<br />
			<div>
				{mounted && <ToggledComponent />}
				<button
					type="button"
					onClick={() => {
						toggleMounted();
					}}>
					toggle component
				</button>
			</div>
		</div>
	);
}
