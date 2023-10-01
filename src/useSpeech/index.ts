import { useCallback, useEffect, useState } from 'react';

type SpeechOptions = {
	voice?: SpeechSynthesisVoice;
	rate?: number;
	pitch?: number;
	volume?: number;
	lang?: string;
};

type SpeechPlayStatus = 'init' | 'play' | 'pause' | 'end' | 'error';

export type SpeechState = {
	isPlaying: boolean;
	status: SpeechPlayStatus;
	errorMessage?: string;
};

/**
 * Hook for playing text using the SpeechSynthesis API.
 *
 * @param {string} text - Text to play.
 * @param {ISpeechOptions} options - Options for playing the text.
 * @param {SpeechSynthesisVoice} [options.voice] - Voice to use for playing the text.
 * @param {number} [options.rate] - Rate at which to play the text.
 * @param {number} [options.pitch] - Pitch at which to play the text.
 * @param {number} [options.volume] - Volume at which to play the text.
 * @param {string} [options.lang] - Language of the text.
 * @returns {SpeechState} State object representing the current state of speech synthesis.
 */
export const useSpeech = (text: string, options: SpeechOptions): SpeechState => {
	const [state, setState] = useState<SpeechState>(() => {
		return {
			isPlaying: false,
			status: 'init',
			errorMessage: undefined,
		};
	});

	const handlePlay = useCallback(() => {
		setState((preState) => {
			return { ...preState, isPlaying: true, status: 'play' };
		});
	}, []);

	const handlePause = useCallback(() => {
		setState((preState) => {
			return { ...preState, isPlaying: false, status: 'pause' };
		});
	}, []);

	const handleEnd = useCallback(() => {
		setState((preState) => {
			return { ...preState, isPlaying: false, status: 'end' };
		});
	}, []);

	const handleError = useCallback((error: SpeechSynthesisErrorEvent) => {
		setState((preState) => {
			return { ...preState, isPlaying: false, status: 'error', errorMessage: error.error };
		});
	}, []);

	useEffect(() => {
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.lang = options?.lang ?? '';
		utterance.voice = options?.voice ?? null;
		utterance.rate = options?.rate ?? 1;
		utterance.pitch = options?.pitch ?? 1;
		utterance.volume = options?.volume ?? 1;
		utterance.onstart = handlePlay;
		utterance.onpause = handlePause;
		utterance.onresume = handlePlay;
		utterance.onend = handleEnd;
		utterance.onerror = handleError;
		window.speechSynthesis.speak(utterance);
		return () => {
			window.speechSynthesis.cancel();
		};
	}, [
		handleEnd,
		handleError,
		handlePause,
		handlePlay,
		options?.lang,
		options?.pitch,
		options?.rate,
		options?.voice,
		options?.volume,
		text,
	]);

	return state;
};

export default useSpeech;
