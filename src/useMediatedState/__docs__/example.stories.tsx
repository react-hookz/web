import { useMediatedState } from '../../index.js';

export function Example() {
	const nonLetterRe = /[^a-z]+/gi;
	const [state, setState] = useMediatedState('123', (value: string) =>
		value.replaceAll(nonLetterRe, '')
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
