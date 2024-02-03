/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import { useSet } from '../../index.js';

export function Example() {
	const set = useSet(['@react-hooks', 'is awesome']);

	return (
		<div>
			<button
				type="button"
				disabled={set.has('@react-hooks')}
				onClick={() => set.add('@react-hooks')}>
				add '@react-hooks'
			</button>
			<button
				type="button"
				disabled={!set.has('@react-hooks')}
				onClick={() => set.delete('@react-hooks')}>
				remove '@react-hooks'
			</button>
			<button type="button" disabled={set.has('is awesome')} onClick={() => set.add('is awesome')}>
				add 'is awesome'
			</button>
			<button
				type="button"
				disabled={!set.has('is awesome')}
				onClick={() => set.delete('is awesome')}>
				remove 'is awesome'
			</button>
			<br />
			<pre>{JSON.stringify([...set], null, 2)}</pre>
		</div>
	);
}
