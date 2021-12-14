import { renderHook, act } from '@testing-library/react-hooks/server';
import { useGetSet } from '../..';

const setUp = (initialValue: any) => renderHook(() => useGetSet(initialValue));

beforeEach(() => {
  jest.useFakeTimers();
});

describe('useGetSet', () => {
  it('should be defined', () => {
    expect(useGetSet).toBeDefined();
  });

  it('should render', () => {
    const { result } = setUp('foo');
    expect(result.error).toBeUndefined();
  });

  it('should init getter and setter', () => {
    const { result } = setUp('foo');
    const [get, set] = result.current;
    expect(get).toBeInstanceOf(Function);
    expect(set).toBeInstanceOf(Function);
  });

  it('should get current value', () => {
    const { result } = setUp('foo');
    const [get] = result.current;
    expect(get()).toBe('foo');
  });

  it('should set new value', () => {
    const { result } = setUp('foo');
    const [get, set] = result.current;
    act(() => set('bar'));
    const currentValue = get();
    expect(currentValue).toBe('bar');
  });

  it('should get and set expected values when used in nested functions', () => {
    const { result } = setUp(0);
    const [get, set] = result.current;
    const onClick = jest.fn(() => {
      setTimeout(() => {
        set(get() + 1);
      }, 1000);
    });

    // simulate 3 clicks
    onClick();
    onClick();
    onClick();

    act(() => {
      jest.runAllTimers();
    });

    expect(get()).toBe(3);
    expect(onClick).toHaveBeenCalledTimes(3);
  });
});
