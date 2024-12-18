import {useThrottledState} from '../../index.js';

export function Example() {
	const [state, setState] = useThrottledState('', 500);

	return (
		<div>
			<div>Below state will update no more than once every 500ms</div>
			<br />
			<div>The input`s value is: {state}</div>
			<input
				type='text'
				onChange={(ev) => {
					setState(ev.target.value);
				}} />
		</div>
	);
}
