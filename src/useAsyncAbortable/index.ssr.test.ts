import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it} from 'vitest';
import {useAsyncAbortable} from '../index.js';

describe('useAsyncAbortable', () => {
	it('should be defined', () => {
		expect(useAsyncAbortable).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useAsyncAbortable(async (_) => {}));
		expect(result.error).toBeUndefined();
	});
});
