import {act, renderHook} from '@testing-library/react-hooks/dom';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {useScreenOrientation} from '../index.js';

describe('useScreenOrientation', () => {
	const matchMediaMock = vi.fn((query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: vi.fn(),
		removeEventListener: vi.fn(),
		dispatchEvent: vi.fn(),
	}));

	vi.stubGlobal('matchMedia', matchMediaMock);

	beforeEach(() => {
		matchMediaMock.mockClear();
	});
	afterEach(() => {
		matchMediaMock.mockClear();
	});

	it('should be defined', () => {
		expect(useScreenOrientation).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useScreenOrientation());
		expect(result.error).toBeUndefined();
	});

	it('should initialize without value if initializeWithValue option is set to false', () => {
		const {result} = renderHook(() => useScreenOrientation({initializeWithValue: false}));
		expect(result.all[0]).toBeUndefined();
		expect(result.all[1]).toBe('landscape');
	});

	it('should return `portrait` in case media query matches and `landscape` otherwise', () => {
		const {result} = renderHook(() => useScreenOrientation());
		expect(result.current).toBe('landscape');

		const mql = matchMediaMock.mock.results[0].value;
		mql.matches = true;

		act(() => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			mql.addEventListener.mock.calls[0][1]();
		});

		expect(result.current).toBe('portrait');
	});
});
