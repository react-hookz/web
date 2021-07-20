import { renderHook } from '@testing-library/react-hooks/dom';
import { useDebouncedEffect } from '../..';

describe('useDebouncedEffect', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(useDebouncedEffect).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useDebouncedEffect(() => {}, [], 200));
    expect(result.error).toBeUndefined();
  });

  it('should call effect only after delay', () => {
    const spy = jest.fn();

    renderHook(() => useDebouncedEffect(spy, [], 200));
    expect(spy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(199);
    expect(spy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
