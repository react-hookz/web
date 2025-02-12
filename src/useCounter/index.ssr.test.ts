import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it} from 'vitest';
import {useCounter} from '../index.js';

describe('useCounter', () => {
	it('should be defined', () => {
		expect(useCounter).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useCounter());
		expect(result.error).toBeUndefined();
	});
});
