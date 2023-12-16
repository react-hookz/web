import { useRef } from 'react';
import { useRerender, useSyncedRef } from '#root/index.js';

export function Example() {
	const ref = useRef(0);
	const syncedRef = useSyncedRef(++ref.current);
	const rerender = useRerender();

	return (
		<div>
			<div>As you may see in source code, ref value updated automatically</div>
			<button type="button" onClick={rerender}>
				Rerender outer component
			</button>{' '}
			<span>renders: {syncedRef.current}</span>
		</div>
	);
}
