import { renderHook } from '@testing-library/react-hooks/server';
import { useCookie } from '../..';

describe('useCookie', () => {
  it('should be defined', () => {
    expect(useCookie).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useCookie('react-hookz'));
    expect(result.error).toBeUndefined();
  });

  it('should return undefined ', () => {
    const { result } = renderHook(() => useCookie('react-hookz'));
    expect(result.current[0]).toBeUndefined();
  });
});
