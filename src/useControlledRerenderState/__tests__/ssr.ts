import { renderHook } from '@testing-library/react-hooks/server';
import { useControlledRerenderState } from '../..';

describe('useControlledRerenderState', () => {
  it('should be defined', () => {
    expect(useControlledRerenderState).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useControlledRerenderState());
    expect(result.error).toBeUndefined();
  });
});
