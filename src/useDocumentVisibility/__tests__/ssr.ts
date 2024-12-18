import {renderHook} from '@testing-library/react-hooks/server';
import {useDocumentVisibility} from '../../index.js';

describe('useDocumentVisibility', () => {
	it('should be defined', () => {
		expect(useDocumentVisibility).toBeDefined();
	});

	it('should return undefined regardless of `initializeWithValue` parameter', () => {
		expect(renderHook(() => useDocumentVisibility()).result.current).toBeUndefined();
		expect(renderHook(() => useDocumentVisibility(true)).result.current).toBeUndefined();
		expect(renderHook(() => useDocumentVisibility(false)).result.current).toBeUndefined();
	});
});
