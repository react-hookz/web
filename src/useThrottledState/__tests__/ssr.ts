import { renderHook } from '@testing-library/react-hooks/server';
import { useThrottledState } from '../..';

describe('useThrottledState', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should be defined', () => {
    expect(useThrottledState).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useThrottledState('', 200));
    expect(result.error).toBeUndefined();
  });
});
