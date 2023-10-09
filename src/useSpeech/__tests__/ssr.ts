import { renderHook } from '@testing-library/react-hooks/server';
import { useSpeech } from '../index';

describe('useSpeech', () => {
	it('should be defined', () => {
		expect(useSpeech).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() =>
			useSpeech('Hello World!', {
				voice: {
					lang: 'en-US',
					name: 'Google US English',
					voiceURI: 'Google US English',
					default: true,
					localService: true,
				},
				volume: 5,
			})
		);
		expect(result.error).toBeUndefined();
		expect(result.current.errorMessage).toBeUndefined();
	});
});
