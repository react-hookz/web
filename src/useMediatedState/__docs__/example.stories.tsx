import React from 'react';
import { useMediatedState } from '../..';

export function Example() {
	const nonLetterRe = /[^a-z]+/gi;
	const [state, setState] = useMediatedState('123', (val: string) =>
		val.replaceAll(nonLetterRe, '')
	);

	return (
		<div>
			<div>Below input will only receive letters</div>
			<input
				type="text"
				value={state}
				onChange={(ev) => {
					setState(ev.currentTarget.value);
				}}
			/>
		</div>
	);
}
