import {renderHook} from '@testing-library/react-hooks/dom';
import {useSessionStorageValue} from '../../index.js';

describe('useSessionStorageValue', () => {
	it('should be defined', () => {
		expect(useSessionStorageValue).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => {
			useSessionStorageValue('foo');
		});
		expect(result.error).toBeUndefined();
	});
});
