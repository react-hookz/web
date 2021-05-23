import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useMediatedState } from '../../src';

describe('useMediatedState', () => {
  it('should be defined', () => {
    expect(useMediatedState).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useMediatedState());
    expect(result.error).toBeUndefined();
  });

  it('should act like useState if mediator not passed', () => {
    const { result } = renderHook(() => useMediatedState(123));

    expect(result.current[0]).toBe(123);
    act(() => {
      result.current[1](321);
    });
    expect(result.current[0]).toBe(321);
  });

  it('should pass received sate through mediator', () => {
    const spy = jest.fn((val: string) => parseInt(val, 10));
    const { result } = renderHook(() => useMediatedState(123, spy));

    expect(result.current[0]).toBe(123);
    act(() => {
      result.current[1]('321');
    });
    expect(result.current[0]).toBe(321);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('321');
  });

  it('should return same setState method each render even if callback is changed', () => {
    const { result, rerender } = renderHook(() =>
      useMediatedState(123, (val: string) => parseInt(val, 10))
    );

    const f1 = result.current[1];
    rerender();
    const f2 = result.current[1];
    rerender();
    const f3 = result.current[1];

    expect(f1).toBe(f2);
    expect(f3).toBe(f2);
  });
});
