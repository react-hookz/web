import { useState } from 'react';
import { usePreviousDistinct } from '#root/index.js';

export function Example() {
	const [value, setValue] = useState(0);
	const [unrelatedValue, setUnrelatedValue] = useState(0);
	const previousDistinctValue = usePreviousDistinct(value);

	const increment = () => {
		setValue((v) => v + 1);
	};

	const decrement = () => {
		setValue((v) => v - 1);
	};

	const triggerUnrelatedRerender = () => {
		setUnrelatedValue((v) => v + 1);
	};

	return (
		<div>
			<span>Current value: {value}</span>

			<div style={{ margin: '1rem 0' }}>
				<div style={{ marginBottom: '0.5rem' }}>
					<button type="button" onClick={increment}>
						increment
					</button>
					<button type="button" onClick={decrement}>
						decrement
					</button>
				</div>

				<button type="button" onClick={triggerUnrelatedRerender}>
					trigger unrelated rerender - {unrelatedValue}
				</button>
			</div>

			<div>Previous value: &quot;{previousDistinctValue ?? 'undefined'}&quot;</div>
		</div>
	);
}
