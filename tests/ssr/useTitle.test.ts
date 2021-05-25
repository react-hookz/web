import { renderHook } from '@testing-library/react-hooks/server';
import { useTitle } from '../../src';

describe('useTitle', () => {
  it('should be defined', () => {
    expect(useTitle).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useTitle('some title'));
    expect(result.error).toBeUndefined();
  });

  it('should unmount without errors', () => {
    const { unmount, result } = renderHook(() =>
      useTitle('some title', { restoreOnUnmount: true })
    );

    unmount();
    expect(result.error).toBeUndefined();
  });
});
