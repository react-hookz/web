import { renderHook } from '@testing-library/react-hooks/server';
import { useNetworkState } from '../../src/useNetworkState';

describe(`useNetworkState`, () => {
  it('should be defined', () => {
    expect(useNetworkState).toBeDefined();
  });
  it('should render', () => {
    renderHook(() => useNetworkState());
  });

  it('should have undefined state', () => {
    const hook = renderHook(() => useNetworkState(), { initialProps: false });

    expect(hook.result.current).toBeUndefined();
  });
});
