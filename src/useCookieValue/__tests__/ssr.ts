import {renderHook} from '@testing-library/react-hooks/server';
import {useCookieValue} from '../index.js';

describe('useCookieValue', () => {
	it('should be defined', () => {
		expect(useCookieValue).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useCookieValue('react-hookz'));
		expect(result.error).toBeUndefined();
	});

	it('should return undefined', () => {
		const {result} = renderHook(() => useCookieValue('react-hookz'));
		expect(result.current[0]).toBeUndefined();
	});
});
