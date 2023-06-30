import * as React from 'react';
import { useCookieValue } from '..';

export function Example() {
	const [cookie, set, remove] = useCookieValue('react-hookz', { expires: 3600 });

	return (
		<div>
			<div>
				<em>Cookie name:</em> react-hookz
			</div>
			<div>
				<em>Cookie value:</em> {cookie}
			</div>
			<br />
			<input
				type="text"
				value={cookie ?? ''}
				placeholder="Enter cookie value here"
				onChange={(ev) => {
					set(ev.target.value);
				}}
			/>
			<br />
			<br />
			<div>
				<button type="button" onClick={remove}>
					remove cookie
				</button>
			</div>
		</div>
	);
}
