import { renderHook } from '@testing-library/react-hooks/server';
import { useScreenOrientation } from '../..';

describe('useScreenOrientation', () => {
  it('should be defined', () => {
    expect(useScreenOrientation).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useScreenOrientation());
    expect(result.error).toBeUndefined();
  });
});
