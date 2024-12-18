import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it} from 'vitest';
import {useLifecycleLogger} from '../index.js';

describe('useLifecycleLogger', () => {
	it('should be defined', () => {
		expect(useLifecycleLogger).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => {
			useLifecycleLogger('TestComponent');
		});
		expect(result.error).toBeUndefined();
	});
});
