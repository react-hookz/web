import { renderHook } from '@testing-library/react-hooks/dom';
import { useConditionalUpdateEffect } from '../..';

describe('useConditionalUpdateEffect', () => {
  it('should be defined', () => {
    expect(useConditionalUpdateEffect).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useConditionalUpdateEffect(() => {}, []));
    expect(result.error).toBeUndefined();
  });

  it('by default should invoke effect only in case all conditions are truthy', () => {
    const spy = jest.fn();
    const { rerender } = renderHook(({ cond }) => useConditionalUpdateEffect(spy, cond), {
      initialProps: { cond: [1] as unknown[] },
    });
    expect(spy).toHaveBeenCalledTimes(0);

    rerender({ cond: [0, 1, 1] });
    expect(spy).toHaveBeenCalledTimes(0);

    rerender({ cond: [1, {}, null] });
    expect(spy).toHaveBeenCalledTimes(0);

    rerender({ cond: [true, {}, [], 25] });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('nor callback neither predicate should not be called on mount', () => {
    const spy = jest.fn();
    const predicateSpy = jest.fn(() => true);
    renderHook(() => useConditionalUpdateEffect(spy, [true], predicateSpy));
    expect(predicateSpy).toHaveBeenCalledTimes(0);
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should apply custom predicate', () => {
    const spy = jest.fn();
    const predicateSpy = jest.fn((arr: unknown[]) => arr.some((i) => Boolean(i)));
    const { rerender } = renderHook(
      ({ cond }) => useConditionalUpdateEffect(spy, cond, predicateSpy),
      {
        initialProps: { cond: [null] as unknown[] },
      }
    );
    expect(predicateSpy).toHaveBeenCalledTimes(0);
    expect(spy).toHaveBeenCalledTimes(0);

    rerender({ cond: [true, {}, [], 25] });
    expect(predicateSpy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(1);

    rerender({ cond: [true, false, 0, null] });
    expect(predicateSpy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledTimes(2);

    rerender({ cond: [undefined, false, 0, null] });
    expect(predicateSpy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
