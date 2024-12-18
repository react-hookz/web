import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it} from 'vitest';
import {useSessionStorageValue} from '../index.js';

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
