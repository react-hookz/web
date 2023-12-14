import { renderHook } from '@testing-library/react-hooks/dom';
import { DependencyList } from 'react';
import { useMemoCache, createMemoCache } from '../..';

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

  it('should handle unstable reference of `areHookInputsEqual`', () => {
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

  describe('createCache', () => {
    it(`should return 'none' when there is no cached value`, () => {
      const memoCache = createMemoCache();
      const dependencyList = [1, 2];

      const cachedValue = memoCache.get(dependencyList);

      expect(memoCache.isNone(cachedValue)).toBeTruthy();
    });

    it('should return cached value', () => {
      const memoCache = createMemoCache();

      const dependencyList = [1, 2];
      const value = Object.values(dependencyList);

      memoCache.set(dependencyList, value);
      const cachedValue = memoCache.get(dependencyList);

      expect(cachedValue).toBe(value);
      expect(memoCache.isNone(cachedValue)).toBeFalsy();
    });

    it('should compare dependency list like React', () => {
      const memoCache = createMemoCache();

      const dependencyList = [1, {}];
      const value = Object.values(dependencyList);

      memoCache.set(dependencyList, value);
      const cachedValue1 = memoCache.get(dependencyList);

      expect(cachedValue1).toBe(value);
      expect(memoCache.isNone(cachedValue1)).toBeFalsy();

      const cachedValue2 = memoCache.get([...dependencyList]);

      expect(cachedValue2).toBe(value);
      expect(memoCache.isNone(cachedValue2)).toBeFalsy();

      const cachedValue3 = memoCache.get([1, {}]);

      expect(memoCache.isNone(cachedValue3)).toBeTruthy();
    });

    it('should work with custom `areHookInputsEqual`', () => {
      const memoCache = createMemoCache(
        (nextDeps: DependencyList, prevDeps: DependencyList | null) =>
          JSON.stringify(nextDeps) === JSON.stringify(prevDeps)
      );

      const dependencyList = [1, {}];
      const value = Object.values(dependencyList);

      memoCache.set(dependencyList, value);
      const cachedValue1 = memoCache.get(dependencyList);

      expect(cachedValue1).toBe(value);
      expect(memoCache.isNone(cachedValue1)).toBeFalsy();

      const cachedValue2 = memoCache.get([1, {}]);

      expect(cachedValue2).toBe(value);
      expect(memoCache.isNone(cachedValue1)).toBeFalsy();
    });

    it('cache should have max 64 entries', () => {
      const memoCache = createMemoCache();

      // eslint-disable-next-line symbol-description
      const firstItem = Symbol();

      const MAX_ENTRIES = 64;
      let indexCounter = 0;

      while (indexCounter !== MAX_ENTRIES) {
        indexCounter++;

        if (indexCounter === 1) {
          memoCache.set([indexCounter], firstItem);
        } else {
          memoCache.set([indexCounter], null);
        }
      }

      const state1 = memoCache.get([1]);
      expect(state1).toBe(firstItem);

      memoCache.set([indexCounter + 1], null);

      const state2 = memoCache.get([1]);
      expect(memoCache.isNone(state2)).toBeTruthy();
    });
  });
});
