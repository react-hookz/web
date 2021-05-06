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
    const hook = renderHook(() => useNetworkState());

    expect(hook.result.current).toStrictEqual({
      downlink: undefined,
      downlinkMax: undefined,
      effectiveType: undefined,
      online: undefined,
      previous: undefined,
      rtt: undefined,
      saveData: undefined,
      since: undefined,
      type: undefined,
    });
  });
});
