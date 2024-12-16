import * as React from 'react';
import { useState } from 'react';
import { useKeyboardEvent } from '../../index.js';

export function Example() {
	const [list, setList] = useState<string[]>([]);

	useKeyboardEvent(
		true,
		(ev) => {
			setList((l) => [...l.slice(-10), ev.key]);
		},
		[],
		{ eventOptions: { passive: true } }
	);

	return (
		<div>
			<div>Press any keys on the keyboard and they will appear below.</div>

			<p>You have pressed</p>
			<ul>
				{list.map((k, i) => (
					// eslint-disable-next-line react/no-array-index-key
					<li key={`${i}_${k}`}>{k}</li>
				))}
			</ul>
		</div>
	);
}
