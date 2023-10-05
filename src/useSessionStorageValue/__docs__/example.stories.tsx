import React from 'react';
import { useSessionStorageValue } from '../..';

type ExampleProps = {
	/**
	 * Default value to return in case key not presented in SessionStorage.
	 */
	readonly defaultValue: string;
	/**
	 * SessionStorage key to manage.
	 */
	readonly key: string;
};

export function Example({
	key = 'react-hookz-ss-test',
	defaultValue = '@react-hookz is awesome',
}: ExampleProps) {
	const ssValue = useSessionStorageValue(key, { defaultValue });

	return (
		<div>
			<div>
				Below input value will persist between page reloads and even browser restart as its value is
				stored in SessionStorage.
			</div>
			<br />
			<input
				type="text"
				value={ssValue.value}
				onChange={(ev) => {
					ssValue.set(ev.currentTarget.value);
				}}
			/>
			<button type="button" onClick={ssValue.remove}>
				remove storage value
			</button>
		</div>
	);
}
