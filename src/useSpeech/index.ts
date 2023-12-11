import { useMemo, useState } from 'react';
import { useDeepCompareEffect } from '../useDeepCompareEffect';

type SpeechOptions = Partial<
	Pick<SpeechSynthesisUtterance, 'lang' | 'pitch' | 'rate' | 'voice' | 'volume'>
>;

type SpeechPlayStatus = 'init' | 'play' | 'pause' | 'end' | 'error';

export type SpeechState = {
	isPlaying: boolean;
	status: SpeechPlayStatus;
	errorMessage?: string;
};

function getInitState(): SpeechState {
	return {
		isPlaying: false,
		status: 'init',
	};
}

/**
 * Hook for playing text using the SpeechSynthesis API.
 *
 * @param {string} text - Text to play.
 * @param {SpeechOptions} options - Options for playing the text.
 * @param {SpeechSynthesisVoice} [options.voice] - Voice to use for playing the text.
 * @param {number} [options.rate] - Rate at which to play the text.
 * @param {number} [options.pitch] - Pitch at which to play the text.
 * @param {number} [options.volume] - Volume at which to play the text.
 * @param {string} [options.lang] - Language of the text.
 * @returns {SpeechState} State object representing the current state of speech synthesis.
 */
export const useSpeech = (text: string, options: SpeechOptions): SpeechState => {
	const [state, setState] = useState<SpeechState>(getInitState);

	useDeepCompareEffect(() => {
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = options?.lang ?? '';
		utterance.voice = options?.voice ?? null;
		utterance.rate = options?.rate ?? 1;
		utterance.pitch = options?.pitch ?? 1;
		utterance.volume = options?.volume ?? 1;
		utterance.addEventListener('start', function () {
			setState((preState) => {
				return { ...preState, isPlaying: true, status: 'play' };
			});
		});

		utterance.addEventListener('pause', function () {
			setState((preState) => {
				return { ...preState, isPlaying: false, status: 'pause' };
			});
		});

		utterance.addEventListener('resume', function () {
			setState((preState) => {
				return { ...preState, isPlaying: true, status: 'play' };
			});
		});

		utterance.addEventListener('end', function () {
			setState((preState) => {
				return { ...preState, isPlaying: false, status: 'end' };
			});
		});

		utterance.addEventListener('error', function (error) {
			setState((preState) => {
				return { ...preState, isPlaying: false, status: 'error', errorMessage: error.error };
			});
		});

		window.speechSynthesis.speak(utterance);
		return () => {
			window.speechSynthesis.cancel();
		};
	}, [options, text, setState]);

	return state;
};

export default useSpeech;
