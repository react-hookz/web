import { useLayoutEffect } from 'react';
import { useIsomorphicLayoutEffect } from '../..';

describe('useIsomorphicLayoutEffect', () => {
  it('should be defined', () => {
    expect(useIsomorphicLayoutEffect).toBeDefined();
  });

  it('should be equal `useLayoutEffect`', () => {
    expect(useIsomorphicLayoutEffect).toBe(useLayoutEffect);
  });
});
