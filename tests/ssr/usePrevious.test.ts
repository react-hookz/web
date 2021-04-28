import { renderHook } from '@testing-library/react-hooks/server';
import { usePrevious } from '../../src';

describe('usePrevious', () => {
  it('should be defined', () => {
    expect(usePrevious).toBeDefined();
  });

  it('should render', () => {
    renderHook(() => usePrevious());
  });

  it('should return undefined on first render', () => {
    const { result } = renderHook(() => usePrevious());

    expect(result.current).toBeUndefined();
  });
});
