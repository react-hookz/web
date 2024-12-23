import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it} from 'vitest';
import {useScreenOrientation} from '../index.js';

describe('useScreenOrientation', () => {
	it('should be defined', () => {
		expect(useScreenOrientation).toBeDefined();
	});

	it('should render if initializeWithValue option is set to false', () => {
		const {result} = renderHook(() => useScreenOrientation({initializeWithValue: false}));
		expect(result.error).toBeUndefined();
	});
});
