import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it} from 'vitest';
import {useWindowSize} from '../index.js';

describe('useWindowSize', () => {
	it('should be defined', () => {
		expect(useWindowSize).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useWindowSize());
		expect(result.error).toBeUndefined();
	});
});
