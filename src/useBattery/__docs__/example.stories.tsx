import * as React from 'react';
import { useBattery } from '../..';

export function Example() {
	const batteryStats = useBattery();
	return (
		<div>
			<div>Your battery state:</div>
			<pre>{JSON.stringify(batteryStats, null, 2)}</pre>
		</div>
	);
}
