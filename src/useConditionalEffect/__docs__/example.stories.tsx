import * as React from 'react';
import { useState } from 'react';
import { useConditionalEffect, useUpdateEffect } from '#root/index.js';

export function Example() {
	const [state1, setState1] = useState(2);
	const [state2, setState2] = useState(2);

	useConditionalEffect(
		() => {
			// eslint-disable-next-line no-alert
			alert('VALUES OF THE COUNTERS ARE EVEN');
		},
		[state1, state2],
		[state1, state2],
		(conditions) => conditions.every((i) => i && i % 2 === 0),
		useUpdateEffect
	);

	return (
		<div>
			<div>An alert will be displayed when both counters have even values.</div>
			<button
				type="button"
				onClick={() => {
					setState1((i) => i + 1);
				}}>
				Increment counter 1 [{state1}]
			</button>{' '}
			<button
				type="button"
				onClick={() => {
					setState2((i) => i + 1);
				}}>
				Increment counter 2 [{state2}]
			</button>
		</div>
	);
}
