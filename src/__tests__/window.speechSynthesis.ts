export const setupWindowSpeechSynthesisUtterance = () => {
	window.SpeechSynthesisUtterance = jest.fn();
	window.speechSynthesis = {
		getVoices: jest.fn().mockReturnValue([
			{
				lang: 'en-US',
				name: 'Google US English',
				voiceURI: 'Google US English',
				default: true,
				localService: true,
			},
		]),
		pause: jest.fn(),
		onvoiceschanged: null,
		paused: false,
		pending: false,
		speaking: false,
		cancel: jest.fn(),
		resume: jest.fn(),
		addEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
		removeEventListener: jest.fn(),
		speak: jest.fn(),
	};
};
