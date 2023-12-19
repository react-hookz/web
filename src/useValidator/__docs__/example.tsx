import * as React from 'react';
import { useState } from 'react';
import { type ValidatorDeferred, useDebouncedCallback, useValidator } from '#root/index.js';

export function Example() {
	const [text, setText] = useState('');

	// As deferred validator is unable to infer the type of validity
	// state - we should define it ourself
	type TextValidityState = { isValid: boolean | undefined; error: Error | undefined };

	// Debounced callback is deferred callback so we should use deferred type
	// of validator (the one that receives dispatcher as an argument)
	const validator = useDebouncedCallback<ValidatorDeferred<TextValidityState>>(
		(d) => {
			const isValid = text.length === 0 || text.length % 2 === 1;

			d({
				isValid,
				error: isValid ? undefined : new Error('text length should be an odd length'),
			});
		},
		[text],
		150
	);

	// Validity state type if inferred from validator
	const [validity] = useValidator(validator, [validator]);

	return (
		<div>
			<div>The input below is only valid if it has an odd number of characters</div>
			<br />

			{validity.isValid === false && <div style={{ color: 'red' }}>{validity.error?.message}</div>}
			<input
				type="text"
				value={text}
				onChange={(ev) => {
					setText(ev.target.value);
				}}
			/>
		</div>
	);
}
