import { renderHook } from '@testing-library/react-hooks/dom';
import { useNetworkState } from '../../src/useNetworkState';

describe(`useNetworkState`, () => {
  it('should be defined', () => {
    expect(useNetworkState).toBeDefined();
  });
  it('should render', () => {
    renderHook(() => useNetworkState());
  });

  it('should return an object of certain structure', () => {
    const hook = renderHook(() => useNetworkState(), { initialProps: false });

    expect(typeof hook.result.current).toEqual('object');
    expect(Object.keys(hook.result.current)).toEqual([
      'online',
      'previous',
      'since',
      'downlink',
      'downlinkMax',
      'effectiveType',
      'rtt',
      'saveData',
      'type',
    ]);
  });
});
