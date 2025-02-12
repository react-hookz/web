import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it} from 'vitest';
import {useAsync} from '../index.js';

describe('useAsync', () => {
	it('should be defined', () => {
		expect(useAsync).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useAsync(async () => {}));
		expect(result.error).toBeUndefined();
	});
});
