import { renderHook } from '@testing-library/react-hooks/server';
import { useCopyToClipboard } from '../..';

describe('useCopyToClipboard', () => {
  it('should be defined', () => {
    expect(useCopyToClipboard).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useCopyToClipboard());
    expect(result.error).toBeUndefined();
  });

  it('should return a 3 elements array', () => {
    const result = renderHook(() => useCopyToClipboard());
    expect(result.result.current).toHaveLength(3);
  });
});
