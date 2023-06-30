import { renderHook } from '@testing-library/react-hooks/server';
import { useDebouncedEffect } from '../..';

describe('useDebouncedEffect', () => {
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
		expect(useDebouncedEffect).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => {
			useDebouncedEffect(() => {}, [], 200);
		});
		expect(result.error).toBeUndefined();
	});
});
