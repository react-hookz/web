import * as React from 'react';
import { useCustomCompareEffect, useUpdateEffect } from '../..';

/**
 * A little hash function to generate a random number used to identify a string.
 * @see https://stackoverflow.com/a/52171480/7304377
 */
const hashWithCYRB53 = (someString: string) => {
	let h1 = 0xde_ad_be_ef;
	let h2 = 0x41_c6_ce_57;

	/* eslint-disable no-bitwise */
	for (let i = 0, ch; i < someString.length; i++) {
		ch = someString.codePointAt(i) ?? 0;
		h1 = Math.imul(h1 ^ ch, 2_654_435_761);
		h2 = Math.imul(h2 ^ ch, 1_597_334_677);
	}

	h1 = Math.imul(h1 ^ (h1 >>> 16), 2_246_822_507) ^ Math.imul(h2 ^ (h2 >>> 13), 3_266_489_909);
	h2 = Math.imul(h2 ^ (h2 >>> 16), 2_246_822_507) ^ Math.imul(h1 ^ (h1 >>> 13), 3_266_489_909);

	return 4_294_967_296 * (2_097_151 & h2) + (h1 >>> 0);
	/* eslint-enable no-bitwise */
};

export function Example() {
	const [valueA, setValueA] = React.useState(0);
	const [valueB, setValueB] = React.useState(0);
	const [irrelevantValue, setIrrelevantValue] = React.useState(0);

	const incrementValueA = () => {
		setValueA((previous) => previous + 1);
	};

	const incrementValueB = () => {
		setValueB((previous) => previous + 1);
	};

	const incrementIrrelevantValue = () => {
		setIrrelevantValue((previous) => previous + 1);
	};

	const objectA = { key: valueA };
	const objectB = { key: valueB };

	useCustomCompareEffect(
		() => {
			// eslint-disable-next-line no-alert
			window.alert('Detected checksum difference from previous render!');
		},
		[objectA, objectB],
		(a, b) => hashWithCYRB53(JSON.stringify(a)) === hashWithCYRB53(JSON.stringify(b)),
		useUpdateEffect
	);

	return (
		<div style={{ fontFamily: 'sans-serif', maxWidth: '70ch', margin: '0 auto' }}>
			<p>
				In this example, there exist two objects in memory that are initialized identically. There
				is an alert that only appears when the objects differ. You can press either button to adjust
				each object&apos;s only value. We hash the objects and use those hashes as a checksum to
				determine if the objects have changed. This is ridiculous for the objects here (because
				they&apos;re tiny and simple), but if you have potentially large, complex objects you may
				wish to go this route instead of leveraging some sort of deep equality check.
			</p>
			<p>
				We&apos;re also using `useUpdateEffect` instead of `useEffect` to avoid running the effect
				on the initial mount of the component.
			</p>

			<aside
				style={{
					backgroundColor: '#DEDEDE',
					borderRadius: '4px',
					margin: '2rem 5vw',
					padding: '1rem',
					fontSize: '14px',
					borderLeft: '3px solid',
					borderRight: '3px solid',
					borderColor: '#ABABAB',
				}}>
				Don&apos;t copy our hash function or presume you can compare objects like we are doing here.
				Remember, objects in JS don&apos;t preserve key ordering.
			</aside>

			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<div style={{ marginBottom: '1rem' }}>
					<span>Current valueA: {valueA}</span>{' '}
					<button type="button" onClick={incrementValueA}>
						increment valueA
					</button>
				</div>
				<div style={{ marginBottom: '1rem' }}>
					<span>Current valueB: {valueB}</span>{' '}
					<button type="button" onClick={incrementValueB}>
						increment valueB
					</button>
				</div>
				<div style={{ marginBottom: '1rem' }}>
					<span>Current irrelevantValue: {irrelevantValue}</span>{' '}
					<button type="button" onClick={incrementIrrelevantValue}>
						increment irrelevantValue
					</button>
				</div>

				<span>Current hash objectA: {hashWithCYRB53(JSON.stringify(objectA))}</span>
				<span>Current hash objectB: {hashWithCYRB53(JSON.stringify(objectB))}</span>
			</div>
		</div>
	);
}
