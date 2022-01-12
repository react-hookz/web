import { renderHook } from '@testing-library/react-hooks/server';
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
    const { result } = renderHook(() => useSafeState(1));
    expect(result.current[1]).toBeInstanceOf(Function);
    expect(result.current[0]).toBe(1);
  });
});
