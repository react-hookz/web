import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it} from 'vitest';
import {useFirstMountState} from '../index.js';

describe('useFirstMountState', () => {
	it('should return true on first render', () => {
		const {result} = renderHook(() => useFirstMountState());

		expect(result.current).toBe(true);
	});
});
