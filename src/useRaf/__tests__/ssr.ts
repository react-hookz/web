import { renderHook } from '@testing-library/react-hooks/server';
import { useRaf } from '../..';

describe('useRaf', () => {
  it('should be defined', () => {
    expect(useRaf).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useRaf());
    expect(result.error).toBeUndefined();
  });

  it('should return a number', () => {
    const { result } = renderHook(() => useRaf());
    expect(typeof result.current).toBe('number');
  });

  it('should init percentage of time elapsed', () => {
    const { result } = renderHook(() => useRaf());
    const timeElapsed = result.current;

    expect(timeElapsed).toBe(0);
  });

  // TODO: more tests?
});
