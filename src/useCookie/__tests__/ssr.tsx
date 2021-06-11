import { renderHook } from '@testing-library/react-hooks/server';
import { useCookie } from '../..';

describe('useCookie', () => {
  it('should be defined', () => {
    expect(useCookie).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useCookie());
    expect(result.error).toBeUndefined();
  });
});
