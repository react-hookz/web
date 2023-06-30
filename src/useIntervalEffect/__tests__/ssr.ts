import { renderHook } from '@testing-library/react-hooks/server';
import { useIntervalEffect } from '../..';

describe('useIntervalEffect', () => {
  it('should be defined', () => {
    expect(useIntervalEffect).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => {
      useIntervalEffect(() => {}, 123);
    });
    expect(result.error).toBeUndefined();
  });
});
