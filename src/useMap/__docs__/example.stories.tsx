/* eslint-disable react/no-unescaped-entities */
import * as React from 'react';
import { useMap } from '#root/index.js';

export function Example() {
	const map = useMap<string, string | Date>([['@react-hooks', 'is awesome']]);

	return (
		<div>
			<button type="button" onClick={() => map.set('@react-hooks', 'is awesome')}>
				set '@react-hooks'
			</button>
			<button
				type="button"
				disabled={!map.has('@react-hooks')}
				onClick={() => map.delete('@react-hooks')}>
				remove '@react-hooks'
			</button>
			<button type="button" onClick={() => map.set('current date', new Date())}>
				set 'current date'
			</button>
			<button
				type="button"
				disabled={!map.has('current date')}
				onClick={() => map.delete('current date')}>
				remove 'current date'
			</button>
			<br />
			<pre>{JSON.stringify([...map], null, 2)}</pre>
		</div>
	);
}
