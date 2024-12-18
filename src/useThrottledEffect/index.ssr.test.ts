import {renderHook} from '@testing-library/react-hooks/server';
import {useThrottledEffect} from '../../index.js';

describe('useThrottledEffect', () => {
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
		expect(useThrottledEffect).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => {
			useThrottledEffect(() => {}, [], 200);
		});
		expect(result.error).toBeUndefined();
	});
});
