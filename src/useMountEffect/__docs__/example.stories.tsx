import * as React from 'react';
import {useState} from 'react';
import {useRerender, useMountEffect} from '../../index.js';

export function Example() {
	const [count, setCount] = useState(0);
	const rerender = useRerender();

	useMountEffect(() => {
		setCount(i => i + 1);
	});

	return (
		<div>
			<div>useMountEffect has run {count} time(s)</div>
			<button
				type='button'
				onClick={() => {
					rerender();
				}}>
				Rerender component
			</button>
		</div>
	);
}
