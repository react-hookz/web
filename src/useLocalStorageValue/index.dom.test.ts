import {renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useLocalStorageValue} from '../index.js';

describe('useLocalStorageValue', () => {
	it('should be defined', async () => {
		expect(useLocalStorageValue).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() => {
			useLocalStorageValue('foo');
		});
		expect(result.error).toBeUndefined();
	});
});
