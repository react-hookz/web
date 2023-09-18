import React, { useRef } from 'react';
import { useSpeech } from '../index';

const voices = window.speechSynthesis.getVoices();

export function Example() {
	const speechState = useSpeech('Hello World!', {
		voice: voices[0],
	});

	return (
		<div>
			<pre>{JSON.stringify(speechState, null, 2)}</pre>
		</div>
	);
}
