import {useEffect} from 'react';
import {describe, expect, it} from 'vitest';
import {useIsomorphicLayoutEffect} from '../index.js';

describe('useIsomorphicLayoutEffect', () => {
	it('should be defined', () => {
		expect(useIsomorphicLayoutEffect).toBeDefined();
	});

	it('should be equal `useEffect`', () => {
		expect(useIsomorphicLayoutEffect).toBe(useEffect);
	});
});
