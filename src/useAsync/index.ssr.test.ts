import {renderHookServer as renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useAsync} from '../index.js';

describe('useAsync', () => {
	it('should be defined', () => {
		expect(useAsync).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => useAsync(async () => {}));
		expect(result.error).toBeUndefined();
	});
});
