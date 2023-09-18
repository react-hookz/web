import { renderHook } from '@testing-library/react-hooks/dom';
import { useSpeech } from '../index';

describe('useSpeech', () => {
	// Mock the SpeechSynthesisUtterance and speechSynthesis objects
	beforeAll(() => {
		window.SpeechSynthesisUtterance = jest.fn();
		// @ts-expect-error testing irrelevant usage
		window.speechSynthesis = {
			speak: jest.fn(),
			getVoices() {
				return [
					{
						lang: 'en-US',
						name: 'Google US English',
						voiceURI: 'Google US English',
						default: true,
						localService: true,
					},
				];
			},
		};
	});

	it('should be defined', () => {
		expect(useSpeech).toBeDefined();
	});

	it('should render and play audio', () => {
		const { result } = renderHook(() => {
			return useSpeech('Hello World!', {
				lang: 'en-US',
				voice: window.speechSynthesis.getVoices()[0],
				volume: 5,
			});
		});
		expect(result.current.voiceInfo.lang).toBe('en-US');
		expect(result.current.volume).toBe(5);
		expect(result.current.errorMessage).toBeUndefined();
		expect(window.speechSynthesis.speak).toHaveBeenCalled();
		expect(result.error).toBeUndefined();
	});
});
