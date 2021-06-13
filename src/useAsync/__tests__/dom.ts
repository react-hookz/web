import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useAsync } from '../..';

describe('useAsync', () => {
  function getControllableAsync<Res, Args extends unknown[] = unknown[]>() {
    const resolve: { current: undefined | ((result: Res) => void) } = { current: undefined };
    const reject: { current: undefined | ((err: Error) => void) } = { current: undefined };

    return [
      jest.fn(
        (...args: Args) =>
          new Promise<Res>((res, rej) => {
            resolve.current = res;
            reject.current = rej;
          })
      ),
      resolve,
      reject,
    ] as const;
  }

  it('should be defined', () => {
    expect(useAsync).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useAsync(async () => {}, [], { skipMount: true }));
    expect(result.error).toBeUndefined();
  });

  it('should not invoke async function on mount if `skipMount` option is passed', () => {
    const spy = jest.fn(async () => {});
    renderHook(() => useAsync(spy, [], { skipMount: true }));

    expect(spy).not.toHaveBeenCalled();
  });

  it('should not invoke async function on args update if `skipUpdate` option is passed', () => {
    const spy = jest.fn(async (_: number) => {});
    const { rerender } = renderHook(
      ({ args }) =>
        useAsync(spy, args, {
          skipUpdate: true,
          skipMount: true,
        }),
      { initialProps: { args: [1] as [number] } }
    );
    expect(spy).not.toHaveBeenCalled();

    rerender({ args: [2] });
    expect(spy).not.toHaveBeenCalled();
  });

  it('should accept `initialValue` option', async () => {
    await act(async () => {
      const [spy, resolve] = getControllableAsync<number, []>();
      const { result } = renderHook(() => useAsync(spy, [], { initialValue: 3 }));

      expect((result.all[0] as ReturnType<typeof useAsync>)[0]).toStrictEqual({
        status: 'not-executed',
        error: undefined,
        result: 3,
      });

      if (resolve.current) {
        resolve.current(2);
      }
    });
  });

  it('should have `not-executed` status initially', async () => {
    await act(async () => {
      const [spy, resolve] = getControllableAsync<undefined, []>();
      const { result } = renderHook(() => useAsync(spy, []));

      expect(result.current[0]).toStrictEqual({
        status: 'not-executed',
        error: undefined,
        result: undefined,
      });

      if (resolve.current) {
        resolve.current(undefined);
      }
    });
  });

  it('should invoke received async function and set `loading` status on mount', async () => {
    await act(async () => {
      const [spy, resolve] = getControllableAsync<undefined, []>();

      const { result, waitForNextUpdate } = renderHook(() => useAsync(spy, []));

      await waitForNextUpdate();

      expect(result.current[0]).toStrictEqual({
        status: 'loading',
        error: undefined,
        result: undefined,
      });
      expect(spy).toHaveBeenCalledTimes(1);

      if (resolve.current) {
        resolve.current(undefined);
      }
    });
  });

  it('should set `success` status and store `result` state field on fulfill', async () => {
    await act(async () => {
      const [spy, resolve] = getControllableAsync<number, []>();

      const { result, waitForNextUpdate } = renderHook(() => useAsync(spy, []));

      await waitForNextUpdate();

      if (resolve.current) {
        resolve.current(123);
      }

      await waitForNextUpdate();

      expect(result.current[0]).toStrictEqual({
        status: 'success',
        error: undefined,
        result: 123,
      });
    });
  });

  it('should set `error` status and store `error` state field on reject', async () => {
    await act(async () => {
      const [spy, , reject] = getControllableAsync<number, []>();

      const { result, waitForNextUpdate } = renderHook(() => useAsync(spy, []));

      await waitForNextUpdate();

      const err = new Error('some error');
      if (reject.current) {
        reject.current(err);
      }

      await waitForNextUpdate();

      expect(result.current[0]).toStrictEqual({
        status: 'error',
        error: err,
        result: undefined,
      });
    });
  });

  it('should invoke async function on args change, should set `loading` state with untouched result', async () => {
    await act(async () => {
      const [spy, resolve] = getControllableAsync<number, [number]>();

      const { result, waitForNextUpdate, rerender } = renderHook((args) => useAsync(spy, args), {
        initialProps: [1] as [number],
      });

      await waitForNextUpdate();
      expect(spy).toHaveBeenCalledWith(1);

      if (resolve.current) {
        resolve.current(1);
      }
      await waitForNextUpdate();
      expect(result.current[0]).toStrictEqual({
        status: 'success',
        error: undefined,
        result: 1,
      });

      rerender([2]);
      await waitForNextUpdate();
      expect(spy).toHaveBeenCalledWith(2);
      expect(result.current[0]).toStrictEqual({
        status: 'loading',
        error: undefined,
        result: 1,
      });

      if (resolve.current) {
        resolve.current(2);
      }
      await waitForNextUpdate();
      expect(result.current[0]).toStrictEqual({
        status: 'success',
        error: undefined,
        result: 2,
      });
    });
  });

  it('should rollback state to initial on `reset` method call', async () => {
    await act(async () => {
      const [spy, resolve] = getControllableAsync<number, []>();

      const { result, waitForNextUpdate, rerender } = renderHook(() =>
        useAsync(spy, [], { initialValue: 42 })
      );

      await waitForNextUpdate();
      if (resolve.current) {
        resolve.current(1);
      }

      await waitForNextUpdate();
      expect(result.current[0]).toStrictEqual({
        status: 'success',
        error: undefined,
        result: 1,
      });

      result.current[1].reset();
      expect(result.current[0]).toStrictEqual({
        status: 'not-executed',
        error: undefined,
        result: 42,
      });
    });
  });

  it('should execute async function on `execute` method call', async () => {
    await act(async () => {
      const [spy, resolve] = getControllableAsync<number, []>();

      const { result, waitForNextUpdate, rerender } = renderHook(() =>
        useAsync(spy, [], { initialValue: 42 })
      );

      await waitForNextUpdate();
      if (resolve.current) {
        resolve.current(1);
      }

      await waitForNextUpdate();
      expect(result.current[0]).toStrictEqual({
        status: 'success',
        error: undefined,
        result: 1,
      });

      result.current[1].execute();
      expect(result.current[0]).toStrictEqual({
        status: 'loading',
        error: undefined,
        result: 1,
      });

      if (resolve.current) {
        resolve.current(42);
      }

      await waitForNextUpdate();
      expect(result.current[0]).toStrictEqual({
        status: 'success',
        error: undefined,
        result: 42,
      });
    });
  });

  it('should not process results of promise if another was executed', async () => {
    await act(async () => {
      const [spy, resolve] = getControllableAsync<number, []>();

      const { result, waitForNextUpdate, rerender } = renderHook((fn) =>
        useAsync(spy, [], { initialValue: 42 })
      );

      await waitForNextUpdate();

      const resolve1 = resolve.current;
      result.current[1].execute();

      if (resolve1) {
        resolve1(1);
      }

      if (resolve.current) {
        resolve.current(2);
      }

      await waitForNextUpdate();
      expect(result.current[0]).toStrictEqual({
        status: 'success',
        error: undefined,
        result: 2,
      });
    });
  });

  it('should not process error of promise if another was executed', async () => {
    await act(async () => {
      const [spy, resolve, reject] = getControllableAsync<number, []>();

      const { result, waitForNextUpdate, rerender } = renderHook((fn) =>
        useAsync(spy, [], { initialValue: 42 })
      );

      await waitForNextUpdate();

      const reject1 = reject.current;
      result.current[1].execute();

      if (reject1) {
        reject1(new Error('42'));
      }

      if (resolve.current) {
        resolve.current(2);
      }

      await waitForNextUpdate();
      expect(result.current[0]).toStrictEqual({
        status: 'success',
        error: undefined,
        result: 2,
      });
    });
  });

  it('should not change methods between renders', () => {
    const spy = jest.fn(async () => {});
    const { rerender, result } = renderHook(() =>
      useAsync(spy, [], {
        skipUpdate: true,
        skipMount: true,
      })
    );

    const res1 = result.current;
    rerender();

    expect(res1[1].execute).toBe(result.current[1].execute);
    expect(res1[1].reset).toBe(result.current[1].reset);
  });
});
