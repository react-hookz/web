import * as React from 'react';
import { useState } from 'react';
import { useRerender, useUpdateEffect } from '../..';

export function Example() {
	const [count, setCount] = useState(1);
	const [isUpdated, setIsUpdated] = useState(false);
	const rerender = useRerender();

	useUpdateEffect(() => {
		setIsUpdated(true);
	}, [count]);

	return (
		<div>
			<div>
				Is counter updated:
				{isUpdated ? 'yes' : 'no'}
			</div>
			<button
				type="button"
				onClick={() => {
					setCount((i) => i + 1);
				}}>
				Increment counter [{count}]
			</button>{' '}
			<button
				type="button"
				onClick={() => {
					rerender();
				}}>
				Just rerender
			</button>
		</div>
	);
}
