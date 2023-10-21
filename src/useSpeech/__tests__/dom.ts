import { renderHook } from '@testing-library/react-hooks/dom';
import { useSpeech } from '../..';

describe('useSpeech', () => {
	// Mock the SpeechSynthesisUtterance and speechSynthesis objects
	const speakSpy = jest.spyOn(window.speechSynthesis, 'speak');
	beforeEach(() => {
		speakSpy.mockReset();
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
		expect(result.current.errorMessage).toBeUndefined();
		expect(speakSpy).toHaveBeenCalled();
		expect(result.error).toBeUndefined();
	});
});
