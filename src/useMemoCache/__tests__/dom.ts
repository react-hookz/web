import { renderHook } from '@testing-library/react-hooks/dom';
import { useMemoCache } from '../..';

describe('useMemoCache', () => {
  it('should be defined', () => {
    expect(useMemoCache).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useMemoCache(() => 10, []));
    expect(result.error).toBeUndefined();
  });

  it('should return resolved state', () => {
    const resolved = 'Hello World';
    const lazyInitialize = () => resolved;

    const {
      result: { current },
    } = renderHook(() => useMemoCache(lazyInitialize, []));

    expect(current).toBe(resolved);
  });

  it('should not invoke factory when state is cached', () => {
    const spy = jest.fn();
    const { result, rerender } = renderHook(
      ({ dependencyList }) => {
        return useMemoCache(() => {
          spy();

          return dependencyList.reduce((a, b) => a + b);
        }, dependencyList);
      },
      { initialProps: { dependencyList: [1, 2] } }
    );

    expect(result.current).toBe(3);
    expect(spy).toHaveBeenCalledTimes(1);

    rerender({ dependencyList: [3, 4] });

    expect(result.current).toBe(7);
    expect(spy).toHaveBeenCalledTimes(2);

    rerender({ dependencyList: [1, 2] });

    expect(result.current).toBe(3);
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
