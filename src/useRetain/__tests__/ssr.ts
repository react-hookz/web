import { renderHook } from '@testing-library/react-hooks/server';
import { useRetain } from '../..';

describe('useRetain', () => {
  it('should be defined', () => {
    expect(useRetain).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() =>
      useRetain(
        () => ({ user: { name: 'John' } }),
        [],
        () => false
      )
    );
    expect(result.error).toBeUndefined();
  });
});
