import * as React from 'react';
import { useEffect } from 'react';
import { useDeepCompareEffect, useRerender } from '#root/index.js';

export function Example() {
	const rerender = useRerender();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const newOnEveryRender = {
		name: 'Foo',
	};

	useEffect(() => {
		console.log('I do get logged on every render.');
	}, [newOnEveryRender]);

	useDeepCompareEffect(() => {
		console.log('I do not get logged on every render.');
	}, [newOnEveryRender]);

	return (
		<>
			<p>Open you browser console and the code for this example.</p>
			<p>
				Repeatedly press the button below. Notice, how the useEffect gets run on every render, but
				useDeepCompareEffect does not. This is because useDeepCompareEffect determines dependency
				changes by deep comparison instead of by reference like useEffect.
			</p>
			<button type="button" onClick={rerender}>
				Rerender
			</button>
		</>
	);
}
