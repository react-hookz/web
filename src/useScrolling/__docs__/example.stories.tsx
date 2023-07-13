import * as React from 'react';
import { useRef } from 'react';
import useScrolling from '..';

export function Example() {
	const ref = useRef(null);
	const isScroll = useScrolling(ref, 500);
	const scolling = String(isScroll);
	return (
		<div
			ref={ref}
			style={{
				overflow: 'auto',
				height: '300px',
				backgroundColor: 'lightcyan',
			}}>
			<h1>scroll me</h1>
			<h2>isScroll: {scolling}</h2>
			<h2>isScroll: {scolling}</h2>
			<h2>isScroll: {scolling}</h2>
			<h2>isScroll: {scolling}</h2>
			<h2>isScroll: {scolling}</h2>
			<h2>isScroll: {scolling}</h2>
			<h2>isScroll: {scolling}</h2>
		</div>
	);
}
