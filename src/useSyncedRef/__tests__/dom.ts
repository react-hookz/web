import { renderHook } from '@testing-library/react-hooks/dom';
import { useSyncedRef } from '../..';

describe('useSyncedRef', () => {
  it('should be defined', () => {
    expect(useSyncedRef).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useSyncedRef(1));
    expect(result.error).toBeUndefined();
  });

  it('should return ref object', () => {
    const { result } = renderHook(() => useSyncedRef(1));

    expect(result.current).toEqual({ current: 1 });
  });

  it('should return same ref between renders', () => {
    const { result, rerender } = renderHook(() => useSyncedRef(1));

    const ref = result.current;
    rerender();
    expect(result.current).toEqual(ref);
    rerender();
    expect(result.current).toEqual(ref);
    rerender();
    expect(result.current).toEqual(ref);
  });

  it('should contain actual value on each render', () => {
    const { result, rerender } = renderHook(({ val }) => useSyncedRef<any>(val), {
      initialProps: { val: 1 as any },
    });

    expect(result.current.current).toBe(1);
    const value1 = { foo: 'bar' };
    rerender({ val: value1 });
    expect(result.current.current).toBe(value1);
    const value2 = ['a', 'b', 'c'];
    rerender({ val: value2 });
    expect(result.current.current).toBe(value2);
  });

  it('should throw on attempt to change ref', () => {
    const { result } = renderHook(() => useSyncedRef(1));

    expect(() => {
      // @ts-expect-error testing irrelevant usage
      result.current.foo = 'bar';
    }).toThrow(new TypeError('Cannot add property foo, object is not extensible'));

    expect(() => {
      // @ts-expect-error testing irrelevant usage
      result.current.current = 2;
    }).toThrow(new TypeError('Cannot set property current of #<Object> which has only a getter'));
  });
});
