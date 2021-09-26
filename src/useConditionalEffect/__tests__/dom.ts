import { renderHook } from '@testing-library/react-hooks/dom';
import { DependencyList, EffectCallback } from 'react';
import {
  truthyAndArrayPredicate,
  truthyOrArrayPredicate,
  useConditionalEffect,
  useUpdateEffect,
} from '../..';

describe('useConditionalEffect', () => {
  it('should be defined', () => {
    expect(useConditionalEffect).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useConditionalEffect(() => {}, undefined, []));
    expect(result.error).toBeUndefined();
  });

  it('by default should invoke effect only in case all conditions are truthy', () => {
    const spy = jest.fn();
    const { rerender } = renderHook(({ cond }) => useConditionalEffect(spy, undefined, cond), {
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
    renderHook(({ cond }) => useConditionalEffect(spy, undefined, cond), {
      initialProps: { cond: [null] as unknown[] },
    });
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('should invoke callback only if deps are changed and conditions match predicate', () => {
    const spy = jest.fn();
    const { rerender } = renderHook(({ cond, deps }) => useConditionalEffect(spy, deps, cond), {
      initialProps: { cond: [false] as unknown[], deps: [1] as any[] },
    });
    expect(spy).toHaveBeenCalledTimes(0);

    rerender({ cond: [false], deps: [2] });
    expect(spy).toHaveBeenCalledTimes(0);

    rerender({ cond: [true], deps: [2] });
    expect(spy).toHaveBeenCalledTimes(0);

    rerender({ cond: [true], deps: [3] });
    expect(spy).toHaveBeenCalledTimes(1);

    rerender({ cond: [true], deps: [3] });
    expect(spy).toHaveBeenCalledTimes(1);

    rerender({ cond: [true], deps: [4] });
    expect(spy).toHaveBeenCalledTimes(2);

    rerender({ cond: [false], deps: [5] });
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should apply custom predicate', () => {
    const spy = jest.fn();
    const predicateSpy = jest.fn((conditions) => truthyOrArrayPredicate(conditions));
    const { rerender } = renderHook(
      ({ cond }) => useConditionalEffect(spy, undefined, cond, predicateSpy),
      {
        initialProps: { cond: [null] as unknown[] },
      }
    );
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

  it('should accept custom hooks and pass extra args to it', () => {
    const callbackSpy = jest.fn();
    const effectSpy = jest.fn(
      (cb: EffectCallback, deps: DependencyList | undefined, _num: number) =>
        useUpdateEffect(cb, deps)
    );
    const { rerender } = renderHook(() =>
      useConditionalEffect(callbackSpy, undefined, [true], truthyAndArrayPredicate, effectSpy, 123)
    );

    expect(callbackSpy).not.toHaveBeenCalled();
    expect(effectSpy).toHaveBeenCalledTimes(1);
    expect(effectSpy.mock.calls[0][2]).toBe(123);

    rerender();

    expect(callbackSpy).toHaveBeenCalledTimes(1);
  });
});
