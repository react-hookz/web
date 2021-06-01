import { act, renderHook } from '@testing-library/react-hooks/server';
import { useToggle } from '../..';

describe('useToggle', () => {
  it('should be defined', () => {
    expect(useToggle).toBeDefined();
  });

  it('should default to false', () => {
    const { result } = renderHook(() => useToggle());

    expect(result.current[0]).toBe(false);
  });

  it('should be instantiatable with value', () => {
    let { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);

    result = renderHook(() => useToggle(() => true)).result;
    expect(result.current[0]).toBe(true);

    result = renderHook(() => useToggle(() => false)).result;
    expect(result.current[0]).toBe(false);
  });

  it('should not change if toggler called', () => {
    const { result } = renderHook(() => useToggle());
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1](true);
    });
    expect(result.current[0]).toBe(false);
  });
});
