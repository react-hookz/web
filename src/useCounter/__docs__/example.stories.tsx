import React from 'react';
import { useCounter } from '../..';

export function Example() {
	const [min, { inc: incMin, dec: decMin }] = useCounter(1);
	const [max, { inc: incMax, dec: decMax }] = useCounter(10);
	const [value, { inc, dec, set, reset }] = useCounter(5, max, min);

	return (
		<div>
			<div>
				current: {value} [min: {min}; max: {max}]
			</div>
			<br />
			Current value:
			<button
				type="button"
				onClick={() => {
					inc();
				}}>
				Increment
			</button>
			<button
				type="button"
				onClick={() => {
					dec();
				}}>
				Decrement
			</button>
			<button
				type="button"
				onClick={() => {
					inc(5);
				}}>
				Increment (+5)
			</button>
			<button
				type="button"
				onClick={() => {
					dec(5);
				}}>
				Decrement (-5)
			</button>
			<button
				type="button"
				onClick={() => {
					set(100);
				}}>
				Set 100
			</button>
			<button
				type="button"
				onClick={() => {
					reset();
				}}>
				Reset
			</button>
			<button
				type="button"
				onClick={() => {
					reset(25);
				}}>
				Reset (25)
			</button>
			<br />
			<br />
			Min value:
			<button
				type="button"
				onClick={() => {
					incMin();
				}}>
				Increment
			</button>
			<button
				type="button"
				onClick={() => {
					decMin();
				}}>
				Decrement
			</button>
			<br />
			<br />
			Max value:
			<button
				type="button"
				onClick={() => {
					incMax();
				}}>
				Increment
			</button>
			<button
				type="button"
				onClick={() => {
					decMax();
				}}>
				Decrement
			</button>
		</div>
	);
}
