import { useLayoutEffect } from 'react';
import { useIsomorphicLayoutEffect } from '../../src';

describe('useIsomorphicLayoutEffect', () => {
  it('should be defined', () => {
    expect(useIsomorphicLayoutEffect).toBeDefined();
  });

  it('should be equal `useLayoutEffect`', () => {
    expect(useIsomorphicLayoutEffect).toBe(useLayoutEffect);
  });
});
