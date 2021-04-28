import { renderHook } from '@testing-library/react-hooks/server';
import { useConditionalUpdateEffect } from '../../src';

describe('useConditionalUpdateEffect', () => {
  it('should be defined', () => {
    expect(useConditionalUpdateEffect).toBeDefined();
  });

  it('should render', () => {
    renderHook(() => useConditionalUpdateEffect(() => {}, []));
  });

  it('nor callback neither predicate should not be called on mount', () => {
    const spy = jest.fn();
    const predicateSpy = jest.fn(() => true);
    renderHook(() => useConditionalUpdateEffect(spy, [true], predicateSpy));
    expect(predicateSpy).toHaveBeenCalledTimes(0);
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
