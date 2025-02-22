import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it} from 'vitest';
import {useClickOutside} from '../index.js';

describe('useClickOutside', () => {
	it('should be defined', () => {
		expect(useClickOutside).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => {
			useClickOutside({current: null}, () => {});
		});
		expect(result.error).toBeUndefined();
	});
});
