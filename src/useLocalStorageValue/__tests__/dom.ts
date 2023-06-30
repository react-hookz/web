import { renderHook } from '@testing-library/react-hooks/dom';
import { useLocalStorageValue } from '../..';

describe('useLocalStorageValue', () => {
	it('should be defined', () => {
		expect(useLocalStorageValue).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => {
			useLocalStorageValue('foo');
		});
		expect(result.error).toBeUndefined();
	});
});
