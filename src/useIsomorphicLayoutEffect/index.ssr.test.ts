import {useEffect} from 'react';
import {describe, expect, it} from 'vite-plus/test';
import {useIsomorphicLayoutEffect} from '../index.js';

describe('useIsomorphicLayoutEffect', () => {
	it('should be defined', () => {
		expect(useIsomorphicLayoutEffect).toBeDefined();
	});

	it('should be equal `useEffect`', () => {
		expect(useIsomorphicLayoutEffect).toBe(useEffect);
	});
});
