import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it} from 'vitest';
import {useEventListener} from '../index.js';

describe('useEventListener', () => {
	it('should be defined', () => {
		expect(useEventListener).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => {
			useEventListener(null, 'random name', () => {});
		});
		expect(result.error).toBeUndefined();
	});
});
