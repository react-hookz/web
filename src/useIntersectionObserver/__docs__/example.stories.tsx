import * as React from 'react';
import { useRef } from 'react';
import { useIntersectionObserver } from '../../index.js';

export function Example() {
	const rootRef = useRef<HTMLDivElement>(null);
	const elementRef = useRef<HTMLDivElement>(null);
	const intersection = useIntersectionObserver(elementRef, { root: rootRef, threshold: [0, 0.5] });

	return (
		<div style={{ display: 'flex', flexWrap: 'wrap' }}>
			<div style={{ width: '100%', marginBottom: '16px' }}>
				Below scrollable container holds a rectangle that turns green when 50% or more of it is
				visible.
			</div>

			<div
				ref={rootRef}
				style={{
					width: '40%',
					height: '40vh',
					overflow: 'auto',
				}}>
				<div
					ref={elementRef}
					style={{
						background: (intersection?.intersectionRatio ?? 0) >= 0.5 ? 'green' : 'red',
						width: '10vw',
						height: '10vw',
						margin: '39vh auto',
					}}
				/>
			</div>
			<pre style={{ flexGrow: 1, marginLeft: '16px' }}>
				{JSON.stringify(
					{
						boundingClientRect: intersection?.boundingClientRect,
						intersectionRatio: intersection?.intersectionRatio,
						intersectionRect: intersection?.intersectionRect,
						isIntersecting: intersection?.isIntersecting,
						rootBounds: intersection?.rootBounds,
						time: intersection?.time,
					},
					null,
					2
				)}
			</pre>
		</div>
	);
}
