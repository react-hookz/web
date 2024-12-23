import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it, vi} from 'vitest';
import {useUnmountEffect} from '../index.js';

describe('useUnmountEffect', () => {
	it('should call effector only when component unmounted', () => {
		const spy = vi.fn();

		renderHook(() => {
			useUnmountEffect(spy);
		});

		expect(spy).toHaveBeenCalledTimes(0);
	});
});
