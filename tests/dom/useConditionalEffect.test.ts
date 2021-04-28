import { renderHook } from '@testing-library/react-hooks/dom';
import { useConditionalEffect } from '../../src';

describe('useConditionalEffect', () => {
  it('should be defined', () => {
    expect(useConditionalEffect).toBeDefined();
  });

  it('should render', () => {
    renderHook(() => useConditionalEffect(() => {}, []));
  });

  it('by default should invoke effect only in case all conditions are truthy', () => {
    const spy = jest.fn();
    const { rerender } = renderHook(({ cond }) => useConditionalEffect(spy, cond), {
      initialProps: { cond: [1] as unknown[] },
    });
    expect(spy).toHaveBeenCalledTimes(1);

    rerender({ cond: [0, 1, 1] });
    expect(spy).toHaveBeenCalledTimes(1);

    rerender({ cond: [1, {}, null] });
    expect(spy).toHaveBeenCalledTimes(1);

    rerender({ cond: [true, {}, [], 25] });
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should not be called on mount if conditions are falsy', () => {
    const spy = jest.fn();
    renderHook(({ cond }) => useConditionalEffect(spy, cond), {
      initialProps: { cond: [null] as unknown[] },
    });
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should apply custom predicate', () => {
    const spy = jest.fn();
    const predicateSpy = jest.fn((arr: unknown[]) => arr.some((i) => Boolean(i)));
    const { rerender } = renderHook(({ cond }) => useConditionalEffect(spy, cond, predicateSpy), {
      initialProps: { cond: [null] as unknown[] },
    });
    expect(predicateSpy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledTimes(0);

    rerender({ cond: [true, {}, [], 25] });
    expect(predicateSpy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledTimes(1);

    rerender({ cond: [true, false, 0, null] });
    expect(predicateSpy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenCalledTimes(2);

    rerender({ cond: [undefined, false, 0, null] });
    expect(predicateSpy).toHaveBeenCalledTimes(4);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
