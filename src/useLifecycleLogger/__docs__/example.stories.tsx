import * as React from 'react';
import { useRerender, useLifecycleLogger } from '#root/index.js';

export function Example() {
	const rerender = useRerender();
	const dependency = 'test';
	useLifecycleLogger('Demo', [dependency]);

	return (
		<div>
			<div>Check your console for useLifecycleLogger logs</div>
			<button
				type="button"
				onClick={() => {
					rerender();
				}}>
				Rerender component
			</button>
		</div>
	);
}
