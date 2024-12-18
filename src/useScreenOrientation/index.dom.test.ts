import {act, renderHook} from '@testing-library/react-hooks/dom';
import {afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {useScreenOrientation} from '../index.js';

describe('useScreenOrientation', () => {
	// Have to copy implementation as jsdom lacks of it
	type MutableMediaQueryList = {
		matches: boolean;
		media: string;
		onchange: null;
		addListener: vi.Mock; // Deprecated
		removeListener: vi.Mock; // Deprecated
		addEventListener: vi.Mock;
		removeEventListener: vi.Mock;
		dispatchEvent: vi.Mock;
	};

	const matchMediaMock = vi.fn();
	let initialMatchMedia: typeof globalThis.matchMedia;

	beforeAll(() => {
		initialMatchMedia = globalThis.matchMedia;
		Object.defineProperty(globalThis, 'matchMedia', {
			writable: true,
			value: matchMediaMock,
		});
	});

	afterAll(() => {
		globalThis.matchMedia = initialMatchMedia;
	});

	beforeEach(() => {
		matchMediaMock.mockImplementation((query: string) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: vi.fn(), // Deprecated
			removeListener: vi.fn(), // Deprecated
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		}));
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

		const mql = matchMediaMock.mock.results[0].value as MutableMediaQueryList;
		mql.matches = true;

		act(() => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			mql.addEventListener.mock.calls[0][1]();
		});

		expect(result.current).toBe('portrait');
	});
});
