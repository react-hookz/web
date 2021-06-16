import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useDebouncedState } from '../..';

describe('useDebouncedState', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(useDebouncedState).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useDebouncedState(undefined, 200));
    expect(result.error).toBeUndefined();
  });

  it('should ', () => {
    act(() => {
      const { result } = renderHook(() => useDebouncedState<string | undefined>(undefined, 200));

      expect(result.current[0]).toBe(undefined);
      result.current[1]('Hello world!');

      jest.advanceTimersByTime(199);
      expect(result.current[0]).toBe(undefined);

      jest.advanceTimersByTime(1);
      expect(result.current[0]).toBe('Hello world!');
    });
  });
});
