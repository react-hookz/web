import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useQueue } from '../..';

describe('useQueue', () => {
  it('should be defined', () => {
    expect(useQueue).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useQueue());
    expect(result.error).toBeUndefined();
  });

  it('should accept an initial value', () => {
    const { result } = renderHook(() => useQueue([0, 1, 2, 3]));
    expect(result.current.items).toStrictEqual([0, 1, 2, 3]);
  });

  it('should remove the first value', () => {
    const { result } = renderHook(() => useQueue([0, 1, 2, 3]));

    act(() => {
      const removed = result.current.remove();
      expect(removed).toBe(0);
    });

    expect(result.current.first).toBe(1);
  });

  it('should remove the last value', () => {
    const { result } = renderHook(() => useQueue([0, 1, 2, 3], 'lilo'));

    act(() => {
      const removed = result.current.remove();
      expect(removed).toBe(3);
    });

    expect(result.current.first).toBe(2);
  });

  it('should return the length', () => {
    const { result } = renderHook(() => useQueue([0, 1, 2, 3]));
    expect(result.current.size).toBe(4);
  });

  it('should add a value to the end', () => {
    const { result } = renderHook(() => useQueue([0, 1, 2, 3]));

    act(() => {
      result.current.add(4);
    });

    expect(result.current.last).toBe(4);
  });

  it('should add a value to the beginning', () => {
    const { result } = renderHook(() => useQueue([0, 1, 2, 3], 'lilo'));

    act(() => {
      result.current.add(4);
    });

    expect(result.current.last).toBe(4);
  });

  it('should return referentially stable functions', () => {
    const { result } = renderHook(() => useQueue([0, 1, 2, 3]));

    const remove1 = result.current.remove;
    const add1 = result.current.add;

    act(() => {
      result.current.add(1);
      result.current.remove();
    });

    expect(result.current.remove).toBe(remove1);
    expect(result.current.add).toBe(add1);
  });
});
