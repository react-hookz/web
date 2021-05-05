import { useEffect } from 'react';
import { useIsomorphicLayoutEffect } from '../../src';

describe('useIsomorphicLayoutEffect', () => {
  it('should be defined', () => {
    expect(useIsomorphicLayoutEffect).toBeDefined();
  });

  it('should be equal `useEffect`', () => {
    expect(useIsomorphicLayoutEffect).toBe(useEffect);
  });
});
