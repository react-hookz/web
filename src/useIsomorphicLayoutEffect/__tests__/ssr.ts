import { useEffect } from 'react';
import { useIsomorphicLayoutEffect } from '../..';

describe('useIsomorphicLayoutEffect', () => {
	it('should be defined', () => {
		expect(useIsomorphicLayoutEffect).toBeDefined();
	});

	it('should be equal `useEffect`', () => {
		expect(useIsomorphicLayoutEffect).toBe(useEffect);
	});
});
