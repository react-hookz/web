import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it} from 'vitest';
import {useHookableRef} from '../index.js';

describe('useHookableRef', () => {
	it('should be defined', () => {
		expect(useHookableRef).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useHookableRef());
		expect(result.error).toBeUndefined();
	});
});
