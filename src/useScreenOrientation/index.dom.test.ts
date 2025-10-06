import {act, renderHook} from '@ver0/react-hooks-testing';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {useScreenOrientation} from '../index.js';
import {expectResultValue} from '../util/testing/test-helpers.js';

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

	it('should be defined', async () => {
		expect(useScreenOrientation).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useScreenOrientation());
		expect(result.error).toBeUndefined();
	});

	it('should initialize without value if initializeWithValue option is set to false', async () => {
		const {result} = await renderHook(() => useScreenOrientation({initializeWithValue: false}));
		expect(expectResultValue(result.all[0])).toBeUndefined();
		expect(expectResultValue(result.all[1])).toBe('landscape');
	});

	it('should return `portrait` in case media query matches and `landscape` otherwise', async () => {
		const {result} = await renderHook(() => useScreenOrientation());
		expect(result.value).toBe('landscape');

		expect(matchMediaMock.mock.results[0].type).toEqual('return');
		if (matchMediaMock.mock.results[0].type !== 'return') {
			return;
		}

		const mql = matchMediaMock.mock.results[0].value;
		mql.matches = true;

		await act(async () => {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			mql.addEventListener.mock.calls[0][1]();
		});

		expect(result.value).toBe('portrait');
	});
});
