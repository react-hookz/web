import { renderHook } from '@testing-library/react-hooks/dom';
import { useAsync } from '../..';

describe('useAsync', () => {
  it('should be defined', () => {
    expect(useAsync).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useAsync(async () => {}, []));
    expect(result.error).toBeUndefined();
  });
});
