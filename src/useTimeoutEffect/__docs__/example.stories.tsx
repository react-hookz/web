import * as React from 'react';
import { useState } from 'react';
import { useTimeoutEffect, useToggle } from '../../index.js';

export function Example() {
	const [numberCalls, setNumberCalls] = useState<number>(0);
	const [enabled, toggleEnabled] = useToggle();
	const [timeoutValue, setTimeoutValue] = useState<number>(1000);
	const [cancelled, toggleCancelled] = useToggle();

	let status;
	if (cancelled) {
		status = 'Cancelled';
	} else {
		status = enabled ? 'Enabled' : 'Disabled';
	}

	const [cancel, reset] = useTimeoutEffect(
		() => {
			setNumberCalls((n) => n + 1);
		},
		enabled ? timeoutValue : undefined
	);

	React.useEffect(() => {
		setNumberCalls(0);
	}, [timeoutValue, enabled]);

	return (
		<div>
			Has fired: {numberCalls.toString()}
			<br />
			Status: {status}
			<br />
			<input
				placeholder="Timeout value"
				type="number"
				min={0}
				value={timeoutValue}
				onChange={(e) => {
					setTimeoutValue(Number(e.target.value));
				}}
			/>
			<button
				type="button"
				onClick={() => {
					toggleEnabled();
					toggleCancelled(false);
				}}>
				{enabled ? 'Disable' : 'Enable'} timeout
			</button>
			<button
				type="button"
				onClick={() => {
					reset();
					toggleCancelled(false);
				}}>
				Reset
			</button>
			<button
				type="button"
				onClick={() => {
					cancel();
					toggleCancelled(enabled && true);
				}}>
				Cancel
			</button>
		</div>
	);
}
