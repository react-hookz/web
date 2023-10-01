import { useCallback, useEffect, useRef, useState } from 'react';
import { useIsMounted } from '../useIsMounted';

type SpeechOptions = {
	voice?: SpeechSynthesisVoice;
	rate: number;
	pitch: number;
	volume: number;
	lang?: string;
};

export type ISpeechOptions = Partial<SpeechOptions>;

export type VoiceInfo = Pick<SpeechSynthesisVoice, 'lang' | 'name'>;

type SpeechPlayStatus = 'init' | 'play' | 'pause' | 'end' | 'error';

export type ISpeechState = SpeechOptions & {
	isPlaying: boolean;
	status: SpeechPlayStatus;
	voiceInfo: VoiceInfo;
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
 * @returns {ISpeechState} State object representing the current state of speech synthesis.
 */
export const useSpeech = (text: string, options: ISpeechOptions): ISpeechState => {
	const isMounted = useIsMounted();
	const mounted = isMounted();
	const [state, setState] = useState<ISpeechState>(() => {
		const { lang = 'default', name = '' } = options.voice ?? {};
		return {
			isPlaying: false,
			status: 'init',
			voiceInfo: {
				lang,
				name,
			},
			rate: options.rate ?? 1,
			pitch: options.pitch ?? 1,
			volume: options.volume ?? 1,
		};
	});

	const handlePlay = useCallback(() => {
		if (!mounted) {
			return;
		}

		setState((preState) => {
			return { ...preState, isPlaying: true, status: 'play' };
		});
	}, []);

	const handlePause = useCallback(() => {
		if (!mounted) {
			return;
		}

		setState((preState) => {
			return { ...preState, isPlaying: false, status: 'pause' };
		});
	}, []);

	const handleEnd = useCallback(() => {
		if (!mounted) {
			return;
		}

		setState((preState) => {
			return { ...preState, isPlaying: false, status: 'end' };
		});
	}, []);

	const handleError = useCallback((error: SpeechSynthesisErrorEvent) => {
		if (!mounted) {
			return;
		}

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
	}, []);

	return state;
};

export default useSpeech;
