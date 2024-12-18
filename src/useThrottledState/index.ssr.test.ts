import {renderHook} from '@testing-library/react-hooks/server';
import {useThrottledState} from '../../index.js';

describe('useThrottledState', () => {
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
		expect(useThrottledState).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useThrottledState('', 200));
		expect(result.error).toBeUndefined();
	});
});
