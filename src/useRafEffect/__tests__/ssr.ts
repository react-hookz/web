import { renderHook } from '@testing-library/react-hooks/server';
import { useRafEffect } from '../..';

describe('useRafEffect', () => {
  it('should be defined', () => {
    expect(useRafEffect).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useRafEffect(() => {}, []));
    expect(result.error).toBeUndefined();
  });
});
