import * as React from 'react';
import { useRef } from 'react';
import { useRafEffect } from '../../index.js';

export function Example() {
	const inputRef = useRef<HTMLInputElement>(null);

	useRafEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, [inputRef.current]);

	return (
		<div>
			The focus will be set on the input element below after the first animation frame. This is
			helpful if your input is, for example, in a portal and you encouter issues interacting with
			the DOM before the first animation frame.{' '}
			<a target="_blank" href="https://github.com/reactjs/reactjs.org/issues/272" rel="noreferrer">
				See this issue
			</a>
			.
			<div>
				<input ref={inputRef} />
			</div>
		</div>
	);
}
