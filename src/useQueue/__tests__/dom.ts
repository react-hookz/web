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
    expect(result.current.first).toBe(0);
  });
});

describe('remove', () => {
  it('should remove the first value', () => {
    const { result } = renderHook(() => useQueue([0, 1, 2, 3]));

    act(() => {
      const removed = result.current.remove();
      expect(removed).toBe(0);
    });

    expect(result.current.first).toBe(1);
  });
});

describe('size', () => {
  it('should return the length', () => {
    const { result } = renderHook(() => useQueue([0, 1, 2, 3]));
    expect(result.current.size).toBe(4);
  });
});

describe('add', () => {
  it('should add a value to the end', () => {
    const { result } = renderHook(() => useQueue([0, 1, 2, 3]));

    act(() => {
      result.current.add(4);
    });

    expect(result.current.last).toBe(4);
  });
});
