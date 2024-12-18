import {useNetworkState} from '../../index.js';

export function Example() {
	const onlineState = useNetworkState();

	return (
		<div>
			<div>Your current internet connection state:</div>
			<pre>{JSON.stringify(onlineState, null, 2)}</pre>
		</div>
	);
}
