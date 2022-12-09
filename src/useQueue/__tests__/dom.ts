import { renderHook } from '@testing-library/react-hooks/dom';
import { useQueue } from '../..';

describe('useQueue', () => {
  it('should be defined', () => {
    expect(useQueue).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useQueue());
    expect(result.error).toBeUndefined();
  });
});
