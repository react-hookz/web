import { renderHook } from '@testing-library/react-hooks/server';
import { useFavicon } from '../..';

describe('useFavicon', () => {
  it('should be defined', () => {
    expect(useFavicon).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useFavicon('My-favicon'));
    expect(result.error).toBeUndefined();
  });
});
