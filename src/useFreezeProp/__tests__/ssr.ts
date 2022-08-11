import { renderHook } from '@testing-library/react-hooks/server';
import { useFreezeProp } from '../..';

describe('useFreezeProp', () => {
  it('should be defined', () => {
    expect(useFreezeProp).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => {
      const mockProp = { isPermanent: true };

      return useFreezeProp(mockProp);
    });
    expect(result.error).toBeUndefined();
  });
});
