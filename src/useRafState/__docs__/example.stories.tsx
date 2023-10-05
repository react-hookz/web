import * as React from 'react';
import { useMountEffect, useRafState } from '../..';

export function Example() {
	const [state, setState] = useRafState({ x: 0, y: 0 });

	useMountEffect(() => {
		// eslint-disable-next-line unicorn/consistent-function-scoping
		const onMouseMove = (event: MouseEvent) => {
			setState({ x: event.clientX, y: event.clientY });
		};

		// eslint-disable-next-line unicorn/consistent-function-scoping
		const onTouchMove = (event: TouchEvent) => {
			setState({ x: event.changedTouches[0].clientX, y: event.changedTouches[0].clientY });
		};

		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('touchmove', onTouchMove);

		return () => {
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('touchmove', onTouchMove);
		};
	});

	return (
		<div>
			Below state will be updated on mouse/cursor move within animation frame
			<pre>{JSON.stringify(state, null, 2)}</pre>
		</div>
	);
}
