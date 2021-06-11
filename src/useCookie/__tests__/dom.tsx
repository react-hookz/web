import { act, renderHook } from '@testing-library/react-hooks/dom';
import * as Cookies from 'js-cookie';
import { IUseCookieReturn, useCookie } from '../..';
import SpyInstance = jest.SpyInstance;

describe('useCookie', () => {
  let getSpy: SpyInstance<{ [p: string]: string }, []>;
  let setSpy: SpyInstance<
    string | undefined,
    [
      name: string,
      value: string | Record<string, any>,
      options?: Cookies.CookieAttributes | undefined
    ]
  >;
  let removeSpy: SpyInstance<void, [name: string, options?: Cookies.CookieAttributes | undefined]>;

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
    expect(useCookie).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useCookie('react-hookz'));
    expect(result.error).toBeUndefined();
  });

  it('should return undefined on first render', () => {
    const { result } = renderHook(() => useCookie('react-hookz'));
    expect((result.all[0] as IUseCookieReturn)[0]).toBeUndefined();
  });

  it('should return null if cookie not exists', () => {
    const { result } = renderHook(() => useCookie('react-hookz'));
    expect(result.current[0]).toBe(null);
    expect(getSpy).toBeCalledWith('react-hookz');
  });

  it('should set the cookie value on call to `set`', () => {
    const { result } = renderHook(() => useCookie('react-hookz'));

    expect(result.current[0]).toBe(null);
    act(() => {
      result.current[1]('awesome');
    });
    expect(result.current[0]).toBe('awesome');
    expect(setSpy).toBeCalledWith('react-hookz', 'awesome', undefined);
    Cookies.remove('react-hookz');
  });

  it('should remove cookie value on call to `remove`', () => {
    const { result } = renderHook(() => useCookie('react-hookz'));

    expect(result.current[0]).toBe(null);
    act(() => {
      result.current[1]('awesome');
    });
    expect(result.current[0]).toBe('awesome');

    act(() => {
      result.current[2]();
    });
    expect(result.current[0]).toBe(null);
    expect(removeSpy).toBeCalledWith('react-hookz', undefined);
    Cookies.remove('react-hookz');
  });

  it('should re-fetch cookie value on call to `fetch`', () => {
    const { result } = renderHook(() => useCookie('react-hookz'));

    Cookies.set('react-hookz', 'rulez');
    expect(result.current[0]).toBe(null);
    act(() => {
      result.current[3]();
    });
    expect(result.current[0]).toBe('rulez');

    Cookies.remove('react-hookz');
  });

  it('should be synchronized between several hooks managing same key', () => {
    const { result: res1 } = renderHook(() => useCookie('react-hookz'));
    const { result: res2 } = renderHook(() => useCookie('react-hookz'));

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
});
