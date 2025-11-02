import {renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useSessionStorageValue} from '../index.js';

describe('useSessionStorageValue', () => {
	it('should be defined', async () => {
		expect(useSessionStorageValue).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useSessionStorageValue('foo');
		});
		expect(result.error).toBeUndefined();
	});
});
