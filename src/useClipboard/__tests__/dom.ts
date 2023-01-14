import { renderHook } from '@testing-library/react-hooks/dom';
import { useClipboard } from '../..';

describe('useClipboard', () => {
  it('should be defined', () => {
    expect(useClipboard).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useClipboard());
    expect(result.error).toBeUndefined();
  });
});
