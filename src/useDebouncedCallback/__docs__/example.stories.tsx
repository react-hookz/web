import { type ComponentProps, useState } from 'react';
import { useDebouncedCallback } from '../../index.js';

export function Example() {
	const [state, setState] = useState('');

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = useDebouncedCallback<
		NonNullable<ComponentProps<'input'>['onChange']>
	>(
		(ev) => {
			setState(ev.target.value);
		},
		[],
		300,
		500
	);

	return (
		<div>
			<div>Below state will update 300ms after last change, but at least once every 500ms</div>
			<br />
			<div>The input`s value is: {state}</div>
			<input type="text" onChange={handleChange} />
		</div>
	);
}
