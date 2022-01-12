/* eslint-disable @typescript-eslint/require-await */
import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useAsync } from '../..';

describe('useAsync', () => {
  function getControllableAsync<Res, Args extends unknown[] = unknown[]>() {
    const resolve: { current: undefined | ((result: Res) => void) } = { current: undefined };
    const reject: { current: undefined | ((err: Error) => void) } = { current: undefined };

    return [
      jest.fn(
        (..._args: Args) =>
          // eslint-disable-next-line promise/param-names
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
    const { result } = renderHook(() => useAsync(async () => true));
    expect(result.error).toBeUndefined();
  });

  it('should not invoke async function on mount if `skipMount` option is passed', () => {
    const spy = jest.fn(async () => {});
    renderHook(() => useAsync(spy));

    expect(spy).not.toHaveBeenCalled();
  });

  it('should apply `initialValue` arg', async () => {
    await act(async () => {
      const [spy, resolve] = getControllableAsync<number, []>();
      const { result } = renderHook(() => useAsync(spy, 3));

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
      const [spy, resolve] = getControllableAsync<undefined | null, []>();
      const { result } = renderHook(() => useAsync(spy));

      expect(result.current[0]).toStrictEqual({
        status: 'not-executed',
        error: undefined,
        result: undefined,
      });

      if (resolve.current) {
        resolve.current(null);
      }
    });
  });

  it('should have `loading` status while promise invoked but not resolved', async () => {
    const [spy, resolve] = getControllableAsync<undefined | null, []>();
    const { result } = renderHook(() => useAsync(spy));

    expect(result.current[0]).toStrictEqual({
      status: 'not-executed',
      error: undefined,
      result: undefined,
    });

    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      result.current[1].execute();
    });

    expect(result.current[0]).toStrictEqual({
      status: 'loading',
      error: undefined,
      result: undefined,
    });

    await act(async () => {
      if (resolve.current) {
        resolve.current(null);
      }
    });
  });

  it('should set `success` status and store `result` state field on fulfill', async () => {
    const [spy, resolve] = getControllableAsync<number, []>();
    const { result } = renderHook(() => useAsync(spy));

    expect(result.current[0]).toStrictEqual({
      status: 'not-executed',
      error: undefined,
      result: undefined,
    });

    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      result.current[1].execute();

      if (resolve.current) resolve.current(123);
    });

    expect(result.current[0]).toStrictEqual({
      status: 'success',
      error: undefined,
      result: 123,
    });
  });

  it('should set `error` status and store `error` state field on reject', async () => {
    const [spy, , reject] = getControllableAsync<number, []>();
    const { result } = renderHook(() => useAsync(spy));

    expect(result.current[0]).toStrictEqual({
      status: 'not-executed',
      error: undefined,
      result: undefined,
    });

    const err = new Error('some error');

    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      result.current[1].execute();

      if (reject.current) reject.current(err);
    });

    expect(result.current[0]).toStrictEqual({
      status: 'error',
      error: err,
      result: undefined,
    });
  });

  it('should rollback state to initial on `reset` method call', async () => {
    const [spy, resolve] = getControllableAsync<number, []>();
    const { result } = renderHook(() => useAsync(spy, 42));

    expect(result.current[0]).toStrictEqual({
      status: 'not-executed',
      error: undefined,
      result: 42,
    });

    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      result.current[1].execute();

      if (resolve.current) resolve.current(1);
    });

    expect(result.current[0]).toStrictEqual({
      status: 'success',
      error: undefined,
      result: 1,
    });

    await act(async () => {
      result.current[1].reset();
    });

    expect(result.current[0]).toStrictEqual({
      status: 'not-executed',
      error: undefined,
      result: 42,
    });
  });

  it('should not process results of promise if another was executed', async () => {
    const [spy, resolve] = getControllableAsync<number, []>();
    const { result } = renderHook(() => useAsync(spy, 42));

    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      result.current[1].execute();
    });
    const resolve1 = resolve.current;

    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      result.current[1].execute();
    });
    const resolve2 = resolve.current;

    await act(async () => {
      if (resolve1) resolve1(1);
      if (resolve2) resolve2(2);
    });

    expect(result.current[0]).toStrictEqual({
      status: 'success',
      error: undefined,
      result: 2,
    });
  });

  it('should not process error of promise if another was executed', async () => {
    const [spy, resolve, reject] = getControllableAsync<number, []>();
    const { result } = renderHook(() => useAsync(spy, 42));

    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      result.current[1].execute();
    });
    const reject1 = reject.current;

    await act(async () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      result.current[1].execute();
    });
    const resolve2 = resolve.current;

    await act(async () => {
      if (reject1) reject1(new Error('some err'));
      if (resolve2) resolve2(2);
    });

    expect(result.current[0]).toStrictEqual({
      status: 'success',
      error: undefined,
      result: 2,
    });
  });

  it('should not change methods between renders', () => {
    const spy = jest.fn(async () => {});
    const { rerender, result } = renderHook(() => useAsync(spy));

    const res1 = result.current;
    rerender();

    expect(res1[1].execute).toBe(result.current[1].execute);
    expect(res1[1].reset).toBe(result.current[1].reset);
  });
});
