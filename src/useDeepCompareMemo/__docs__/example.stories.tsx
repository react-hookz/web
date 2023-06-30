import * as React from 'react';
import { useMemo } from 'react';
import { useRerender, useDeepCompareMemo } from '../..';

export function Example() {
	const newOnEveryRender = { value: 'Foo' };
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const unstable = useMemo(() => Math.floor(Math.random() * 10), [newOnEveryRender]);

	const stable = useDeepCompareMemo(() => Math.floor(Math.random() * 10), [newOnEveryRender]);

	const rerender = useRerender();
	return (
		<>
			<div style={{ display: 'flex', gap: '0.5rem' }}>
				<p>When you click this button:</p>
				<button type="button" onClick={rerender}>
					Rerender
				</button>
				<p>, you notice, that the useDeepCompareMemo value does not change at all,</p>
			</div>
			<p>even though its dependencies change on every render.</p>
			<br />
			<p>useMemo: {unstable}</p>
			<p>useDeepCompareMemo: {stable}</p>
		</>
	);
}
