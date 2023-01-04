import { renderHook } from '@testing-library/react-hooks/dom';
import { DependencyList } from 'react';
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

  it('should invoke when state is not cached (reference case)', () => {
    const spy = jest.fn();
    const { result, rerender } = renderHook(
      ({ dependencyList }) => {
        return useMemoCache(() => {
          spy();

          return Object.values(dependencyList[0]);
        }, dependencyList);
      },
      { initialProps: { dependencyList: [{ a: 1, b: 2 }] } }
    );

    expect(result.current).toEqual([1, 2]);
    expect(spy).toHaveBeenCalledTimes(1);

    rerender({ dependencyList: [{ a: 1, b: 2 }] });

    expect(result.current).toEqual([1, 2]);
    expect(spy).toHaveBeenCalledTimes(2);

    rerender({ dependencyList: [{ a: 2, b: 3 }] });

    expect(result.current).toEqual([2, 3]);
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('should work with custom `areHookInputsEqual`', () => {
    const spy = jest.fn();
    const customAreHookInputsEqual = (nextDeps: DependencyList, prevDeps: DependencyList | null) =>
      JSON.stringify(nextDeps) === JSON.stringify(prevDeps);

    const { result, rerender } = renderHook(
      ({ dependencyList }) => {
        return useMemoCache(
          () => {
            spy();

            return Object.values(dependencyList[0]);
          },
          dependencyList,
          customAreHookInputsEqual
        );
      },
      { initialProps: { dependencyList: [{ a: 1, b: 2 }] } }
    );

    expect(result.current).toEqual([1, 2]);
    expect(spy).toHaveBeenCalledTimes(1);

    rerender({ dependencyList: [{ a: 1, b: 2 }] });

    expect(result.current).toEqual([1, 2]);
    expect(spy).toHaveBeenCalledTimes(1);

    rerender({ dependencyList: [{ a: 2, b: 3 }] });

    expect(result.current).toEqual([2, 3]);
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should handle unstable refference of `areHookInputsEqual`', () => {
    const spy = jest.fn();
    const initialDependencyList = [{ a: 1, b: 2 }];

    const { result, rerender } = renderHook(
      ({ dependencyList }) => {
        return useMemoCache(
          () => {
            spy();

            return Object.values(dependencyList[0]);
          },
          dependencyList,
          (nextDeps: DependencyList, prevDeps: DependencyList | null) =>
            JSON.stringify(nextDeps) === JSON.stringify(prevDeps)
        );
      },
      { initialProps: { dependencyList: initialDependencyList } }
    );

    expect(result.current).toEqual([1, 2]);
    expect(spy).toHaveBeenCalledTimes(1);

    rerender({ dependencyList: initialDependencyList });

    expect(result.current).toEqual([1, 2]);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
