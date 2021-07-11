import { renderHook } from '@testing-library/react-hooks/server';
import { useConditionalUpdateEffect } from '../..';

describe('useConditionalUpdateEffect', () => {
  it('should be defined', () => {
    expect(useConditionalUpdateEffect).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useConditionalUpdateEffect(() => {}, []));
    expect(result.error).toBeUndefined();
  });

  it('nor callback neither predicate should not be called on mount', () => {
    const spy = jest.fn();
    const predicateSpy = jest.fn(() => true);
    renderHook(() => useConditionalUpdateEffect(spy, [true], undefined, predicateSpy));
    expect(predicateSpy).toHaveBeenCalledTimes(0);
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
