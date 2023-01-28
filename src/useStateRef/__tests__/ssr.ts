import { renderHook } from '@testing-library/react-hooks/server';
import { useStateRef } from '../..';

describe('useStateRef', () => {
  it('should be defined', () => {
    expect(useStateRef).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useStateRef(() => null));
    expect(result.error).toBeUndefined();
  });
});
