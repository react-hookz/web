import { renderHook } from '@testing-library/react-hooks/server';
import { useDocumentTitle } from '../..';

describe('useDocumentTitle', () => {
  it('should be defined', () => {
    expect(useDocumentTitle).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useDocumentTitle('some title'));
    expect(result.error).toBeUndefined();
  });

  it('should unmount without errors', () => {
    const { unmount, result } = renderHook(() =>
      useDocumentTitle('some title', { restoreOnUnmount: true })
    );

    unmount();
    expect(result.error).toBeUndefined();
  });
});
