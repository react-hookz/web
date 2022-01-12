import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useSafeState } from '../..';

describe('useSafeState', () => {
  it('should be defined', () => {
    expect(useSafeState).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useSafeState());
    expect(result.error).toBeUndefined();
  });

  it('should not call', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    consoleSpy.mockImplementationOnce(() => {});

    const { result, unmount } = renderHook(() => useSafeState(1));
    expect(result.current[1]).toBeInstanceOf(Function);
    expect(result.current[0]).toBe(1);

    act(() => {
      result.current[1](321);
    });

    expect(result.current[0]).toBe(321);

    unmount();

    act(() => {
      result.current[1](123);
    });

    expect(consoleSpy).toHaveBeenCalledTimes(0);
    expect(result.current[0]).toBe(321);

    consoleSpy.mockRestore();
  });
});
