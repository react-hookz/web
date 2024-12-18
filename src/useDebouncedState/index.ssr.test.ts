import {renderHook} from '@testing-library/react-hooks/server';
import {useDebouncedState} from '../../index.js';

describe('useDebouncedState', () => {
	beforeAll(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.clearAllTimers();
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	it('should be defined', () => {
		expect(useDebouncedState).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useDebouncedState(undefined, 200));
		expect(result.error).toBeUndefined();
	});
});
