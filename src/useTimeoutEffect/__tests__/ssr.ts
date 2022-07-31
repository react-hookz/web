import { renderHook } from '@testing-library/react-hooks/server';
import { useTimeoutEffect } from '../..';

describe('useTimeoutEffect', () => {
  it('should be defined', () => {
    expect(useTimeoutEffect).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useTimeoutEffect(() => {}, 123));
    expect(result.error).toBeUndefined();
  });
});
