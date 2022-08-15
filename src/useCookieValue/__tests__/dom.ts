/* eslint-disable @typescript-eslint/no-explicit-any */
import { act, renderHook } from '@testing-library/react-hooks/dom';
import Cookies from 'js-cookie';
import { UseCookieValueReturn, useCookieValue } from '../useCookieValue';
import SpyInstance = jest.SpyInstance;

describe('useCookieValue', () => {
  type CookiesGet = typeof Cookies.get;
  type CookiesSet = typeof Cookies.set;
  type CookiesRemove = typeof Cookies.remove;

  let getSpy: SpyInstance<ReturnType<CookiesGet>, Parameters<CookiesGet>>;
  let setSpy: SpyInstance<ReturnType<CookiesSet>, Parameters<CookiesSet>>;
  let removeSpy: SpyInstance<ReturnType<CookiesRemove>, Parameters<CookiesRemove>>;

  beforeAll(() => {
    getSpy = jest.spyOn(Cookies, 'get');
    setSpy = jest.spyOn(Cookies, 'set');
    removeSpy = jest.spyOn(Cookies, 'remove');
  });

  afterAll(() => {
    getSpy.mockRestore();
    setSpy.mockRestore();
    removeSpy.mockRestore();
  });

  beforeEach(() => {
    getSpy.mockClear();
    setSpy.mockClear();
    removeSpy.mockClear();
  });

  it('should be defined', () => {
    expect(useCookieValue).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useCookieValue('react-hookz'));
    expect(result.error).toBeUndefined();
  });

  it('should return cookie value on first render', () => {
    Cookies.set('react-hookz', 'awesome');

    const { result } = renderHook(() => useCookieValue('react-hookz'));
    expect((result.all[0] as UseCookieValueReturn)[0]).toBe('awesome');

    Cookies.remove('react-hookz');
  });

  it('should return undefined on first render if `initializeWithValue` set to false', () => {
    const { result } = renderHook(() =>
      useCookieValue('react-hookz', { initializeWithValue: false })
    );
    expect((result.all[0] as UseCookieValueReturn)[0]).toBeUndefined();
  });

  it('should return null if cookie not exists', () => {
    const { result } = renderHook(() => useCookieValue('react-hookz'));
    expect(result.current[0]).toBe(null);
    expect(getSpy).toBeCalledWith('react-hookz');
  });

  it('should set the cookie value on call to `set`', () => {
    const { result } = renderHook(() => useCookieValue('react-hookz'));

    expect(result.current[0]).toBe(null);
    act(() => {
      result.current[1]('awesome');
    });
    expect(result.current[0]).toBe('awesome');
    expect(setSpy).toBeCalledWith('react-hookz', 'awesome', {});
    Cookies.remove('react-hookz');
  });

  it('should remove cookie value on call to `remove`', () => {
    const { result } = renderHook(() => useCookieValue('react-hookz'));

    expect(result.current[0]).toBe(null);
    act(() => {
      result.current[1]('awesome');
    });
    expect(result.current[0]).toBe('awesome');

    act(() => {
      result.current[2]();
    });
    expect(result.current[0]).toBe(null);
    expect(removeSpy).toBeCalledWith('react-hookz', {});
    Cookies.remove('react-hookz');
  });

  it('should re-fetch cookie value on call to `fetch`', () => {
    const { result } = renderHook(() => useCookieValue('react-hookz'));

    Cookies.set('react-hookz', 'rulez');
    expect(result.current[0]).toBe(null);
    act(() => {
      result.current[3]();
    });
    expect(result.current[0]).toBe('rulez');

    Cookies.remove('react-hookz');
  });

  it('should be synchronized between several hooks with the same key', () => {
    const { result: res1 } = renderHook(() => useCookieValue('react-hookz'));
    const { result: res2 } = renderHook(() => useCookieValue('react-hookz'));

    expect(res1.current[0]).toBe(null);
    expect(res2.current[0]).toBe(null);

    act(() => {
      res1.current[1]('awesome');
    });

    expect(res1.current[0]).toBe('awesome');
    expect(res2.current[0]).toBe('awesome');

    act(() => {
      res2.current[2]();
    });

    expect(res1.current[0]).toBe(null);
    expect(res2.current[0]).toBe(null);
  });

  it('should return stable methods', () => {
    const { result, rerender } = renderHook(() => useCookieValue('react-hookz'));

    const res1 = result.current;

    rerender();

    expect(res1[1]).toBe(result.current[1]);
    expect(res1[2]).toBe(result.current[2]);
    expect(res1[3]).toBe(result.current[3]);
  });
});
