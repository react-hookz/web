import React, { useRef } from 'react';
import { useSpeech } from '../index';

const voices = window.speechSynthesis.getVoices();

export function Example() {
	const speechState = useSpeech(
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		{
			voice: voices[0],
		}
	);

	return (
		<div>
			<pre>{JSON.stringify(speechState, null, 2)}</pre>
		</div>
	);
}
