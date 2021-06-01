import { renderHook } from '@testing-library/react-hooks/server';
import { useRafCallback } from '../..';

describe('useRafCallback', () => {
  it('should be defined', () => {
    expect(useRafCallback).toBeDefined();
  });

  it('should render', () => {
    renderHook(() => useRafCallback(() => {}));
  });

  it('should return array of functions', () => {
    const { result } = renderHook(() => useRafCallback(() => {}));

    expect(result.current).toBeInstanceOf(Array);
    expect(result.current[0]).toBeInstanceOf(Function);
    expect(result.current[1]).toBeInstanceOf(Function);
  });

  it('should not do anything on returned functions invocation', () => {
    const spy = jest.fn();
    const { result } = renderHook(() => useRafCallback(spy));

    result.current[0]();
    jest.advanceTimersToNextTimer();
    result.current[1]();

    expect(spy).not.toHaveBeenCalled();
  });
});
