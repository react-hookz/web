import { act, renderHook } from '@testing-library/react-hooks/server';
import { useRef } from 'react';
import { useRerender } from '../..';

describe('useRerender', () => {
  it('should be defined', () => {
    expect(useRerender).toBeDefined();
  });

  it('should do nothing on returned function invocation', () => {
    const { result } = renderHook(() => {
      const cnt = useRef(0);
      const rerender = useRerender();

      return [rerender, ++cnt.current] as const;
    });

    expect(result.current[1]).toBe(1);
    act(() => {
      result.current[0]();
    });
    expect(result.current[1]).toBe(1);
    act(() => {
      result.current[0]();
    });
    expect(result.current[1]).toBe(1);
  });
});
