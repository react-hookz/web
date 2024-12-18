import * as React from 'react';
import {useQueue} from '../../index.js';

export function Example() {
	const {add, remove, first, last, size, items} = useQueue < number > ([1, 2, 3]);

	return (
		<div>
			<ul>
				<li>first: {first}</li>
				<li>last: {last}</li>
				<li>size: {size}</li>
			</ul>
			<button
				type='button'
				onClick={() => {
					add((last ?? 0) + 1);
				}}>
				Add
			</button>
			<button type='button' onClick={() => remove()}>
				Remove
			</button>
			<h4>All Items</h4>
			<ul>
				{items.map((item, idx) => (
					// eslint-disable-next-line react/no-array-index-key
					<li key={idx}>{item}</li>
				))}
			</ul>
		</div>
	);
}
