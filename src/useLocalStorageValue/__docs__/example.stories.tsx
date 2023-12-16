import { useLocalStorageValue } from '../../index.js';

type ExampleProps = {
	/**
	 * Default value to return in case key not presented in LocalStorage.
	 */
	readonly defaultValue: string;
	/**
	 * LocalStorage key to manage.
	 */
	readonly key: string;
};

export function Example({
	key = 'react-hookz-ls-test',
	defaultValue = '@react-hookz is awesome',
}: ExampleProps) {
	const lsValue = useLocalStorageValue(key, {
		defaultValue,
	});

	return (
		<div>
			<div>
				Below input value will persist between page reloads and even browser restart as its value is
				stored in LocalStorage.
			</div>
			<br />
			<input
				type="text"
				value={lsValue.value}
				onChange={(ev) => {
					lsValue.set(ev.currentTarget.value);
				}}
			/>
			<button type="button" onClick={lsValue.remove}>
				remove storage value
			</button>
		</div>
	);
}
