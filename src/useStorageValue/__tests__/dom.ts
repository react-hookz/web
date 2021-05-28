import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useStorageValue } from '../useStorageValue';
import Mocked = jest.Mocked;

describe('useStorageValue', () => {
  it('should be defined', () => {
    expect(useStorageValue).toBeDefined();
  });

  const adapter = {
    getItem: jest.fn(() => null),

    setItem: jest.fn(() => {}),

    removeItem: jest.fn(() => {}),
  } as unknown as Mocked<Storage>;

  beforeEach(() => {
    adapter.getItem.mockClear().mockImplementation(() => null);
    adapter.setItem.mockClear();
    adapter.removeItem.mockClear();
  });

  it('should render', () => {
    const { result } = renderHook(() => useStorageValue(adapter, 'foo'));
    expect(result.error).toBeUndefined();
  });

  it('should fetch value from storage only on init', () => {
    adapter.getItem.mockImplementationOnce((key) => `"${key}"`);
    const { result, rerender } = renderHook(() => useStorageValue(adapter, 'foo'));
    expect(result.current[0]).toBe('foo');
    expect(adapter.getItem).toHaveBeenCalledWith('foo');
    rerender();
    rerender();
    rerender();
    expect(adapter.getItem).toHaveBeenCalledTimes(1);
  });

  it('should pass value through JSON.parse during fetch', () => {
    const JSONParseSpy = jest.spyOn(JSON, 'parse');
    adapter.getItem.mockImplementationOnce((key) => `"${key}"`);
    const { result } = renderHook(() => useStorageValue(adapter, 'foo'));
    expect(result.current[0]).toBe('foo');
    expect(JSONParseSpy).toHaveBeenCalledWith('"foo"');
    JSONParseSpy.mockRestore();
  });

  it('should yield default value in case storage returned null during fetch', () => {
    adapter.getItem.mockImplementationOnce(() => null);
    const { result } = renderHook(() => useStorageValue(adapter, 'foo', 'defaultValue'));
    expect(result.current[0]).toBe('defaultValue');
    expect(adapter.getItem).toHaveBeenCalledWith('foo');
  });

  it('should yield default value and console.warn in case storage returned corrupted JSON', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementationOnce(() => {});
    adapter.getItem.mockImplementationOnce(() => 'corrupted JSON');
    const { result } = renderHook(() => useStorageValue(adapter, 'foo', 'defaultValue'));
    expect(result.current[0]).toBe('defaultValue');
    expect(warnSpy.mock.calls[0][0]).toBeInstanceOf(SyntaxError);
    warnSpy.mockRestore();
  });

  it('should not fetch value on first render in case `initializeWithStorageValue` options is set to false', () => {
    adapter.getItem.mockImplementationOnce(() => '"bar"');
    const { result } = renderHook(() =>
      useStorageValue<string>(adapter, 'foo', null, { initializeWithStorageValue: false })
    );
    // @ts-expect-error invalid typings of testing library
    expect(result.all[0][0]).toBe(undefined);
    // @ts-expect-error invalid typings of testing library
    expect(result.all[1][0]).toBe('bar');
  });

  it('should set storage value on setState call', () => {
    adapter.getItem.mockImplementationOnce(() => null);
    const { result } = renderHook(() => useStorageValue<string>(adapter, 'foo', null));

    expect(result.current[0]).toBe(null);
    act(() => {
      result.current[1]('bar');
    });
    expect(result.current[0]).toBe('bar');

    const spySetter = jest.fn(() => 'baz');
    act(() => {
      result.current[1](spySetter);
    });
    expect(result.current[0]).toBe('baz');
    expect(spySetter).toHaveBeenCalledWith('bar');
  });

  it('should call JSON.stringify on setState call', () => {
    const JSONStringifySpy = jest.spyOn(JSON, 'stringify');
    adapter.getItem.mockImplementationOnce(() => null);
    const { result } = renderHook(() => useStorageValue<string>(adapter, 'foo', null));

    expect(result.current[0]).toBe(null);
    act(() => {
      result.current[1]('bar');
    });
    expect(result.current[0]).toBe('bar');
    expect(JSONStringifySpy).toHaveBeenCalledWith('bar');
    JSONStringifySpy.mockRestore();
  });

  it('should not store null or data that cannot be processed by JSON serializer and emit console.warn', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementationOnce(() => {});
    adapter.getItem.mockImplementationOnce(() => '"bar"');
    const { result } = renderHook(() => useStorageValue<string>(adapter, 'foo', 'default value'));

    const invalidData: { a?: unknown } = {};
    invalidData.a = { b: invalidData };

    expect(result.current[0]).toBe('bar');
    act(() => {
      // @ts-expect-error testing inappropriate use
      result.current[1](null);
    });
    expect(result.current[0]).toBe('bar');
    expect(warnSpy).toHaveBeenCalledWith(
      `'null' is not a valid data for useStorageValue hook, this operation will take no effect`
    );

    warnSpy.mockRestore();
  });

  it('should call storage`s removeItem on item remove', () => {
    adapter.getItem.mockImplementationOnce(() => null);
    const { result } = renderHook(() => useStorageValue<string>(adapter, 'foo', null));

    act(() => {
      result.current[2]();
    });
    expect(adapter.removeItem).toHaveBeenCalledWith('foo');
  });

  it('should set state to default value on item remove', () => {
    adapter.getItem.mockImplementationOnce(() => '"bar"');
    const { result } = renderHook(() => useStorageValue<string>(adapter, 'foo', 'default value'));

    expect(result.current[0]).toBe('bar');
    act(() => {
      result.current[2]();
    });
    expect(result.current[0]).toBe('default value');
  });

  it('should refetch value from store on fetchItem call', () => {
    adapter.getItem.mockImplementationOnce(() => '"bar"');
    const { result } = renderHook(() => useStorageValue<string>(adapter, 'foo', 'default value'));

    expect(adapter.getItem).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe('bar');
    adapter.getItem.mockImplementationOnce(() => '"baz"');
    act(() => {
      result.current[3]();
    });
    expect(adapter.getItem).toHaveBeenCalledTimes(2);
    expect(result.current[0]).toBe('baz');
  });

  it('should refetch value on key change', () => {
    adapter.getItem.mockImplementation((key) => `"${key}"`);
    const { result, rerender } = renderHook(
      ({ key }) => useStorageValue<string>(adapter, key, 'default value'),
      { initialProps: { key: 'foo' } }
    );

    expect(result.current[0]).toBe('foo');
    rerender({ key: 'bar' });
    expect(result.current[0]).toBe('bar');
  });

  it('should store initially default value to storage if configured', () => {
    adapter.getItem.mockImplementationOnce(() => null);
    const { result } = renderHook(() =>
      useStorageValue<string>(adapter, 'foo', 'default value', {
        storeDefaultValue: true,
      })
    );

    expect(result.current[0]).toBe('default value');
    expect(adapter.setItem).toHaveBeenCalledWith('foo', '"default value"');
  });

  it('should store default value if it became default after initial render', () => {
    adapter.getItem.mockImplementationOnce(() => '"bar"');
    const { result } = renderHook(() =>
      useStorageValue<string>(adapter, 'foo', 'default value', {
        storeDefaultValue: true,
      })
    );
    adapter.getItem.mockImplementationOnce(() => null);

    expect(result.current[0]).toBe('bar');
    expect(adapter.setItem).not.toHaveBeenCalled();

    act(() => {
      result.current[2]();
    });

    expect(result.current[0]).toBe('default value');
    expect(adapter.setItem).toHaveBeenCalledWith('foo', '"default value"');
  });

  it('should not store default value on rerenders with persisted state', () => {
    adapter.getItem.mockImplementationOnce(() => null);
    const { result, rerender } = renderHook(() =>
      useStorageValue<string>(adapter, 'foo', 'default value', {
        storeDefaultValue: true,
      })
    );

    expect(result.current[0]).toBe('default value');
    expect(adapter.setItem).toHaveBeenCalledWith('foo', '"default value"');
    rerender();
    rerender();
    rerender();
    expect(adapter.setItem).toHaveBeenCalledTimes(1);
  });

  it('should not store null default value to store', () => {
    adapter.getItem.mockImplementationOnce(() => null);
    renderHook(() =>
      useStorageValue<string>(adapter, 'foo', null, {
        storeDefaultValue: true,
      })
    );

    expect(adapter.setItem).not.toHaveBeenCalled();
  });

  describe('should handle window`s `storage` event', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    beforeEach(() => {
      addEventListenerSpy.mockClear();
      removeEventListenerSpy.mockClear();
    });

    it('should subscribe to event on mount', () => {
      renderHook(() => useStorageValue<string>(adapter, 'foo'));

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const subscribeCall = addEventListenerSpy.mock.calls.find((i) => i[0] === 'storage')!;
      expect(subscribeCall).not.toBe(undefined);
      expect(subscribeCall[1]).toBeInstanceOf(Function);
      expect(subscribeCall[2]).toStrictEqual({ passive: true });
    });

    it('should not subscribe to event on mount if synchronisations is disabled', () => {
      renderHook(() =>
        useStorageValue<string>(adapter, 'foo', null, { handleStorageEvent: false })
      );

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const subscribeCall = addEventListenerSpy.mock.calls.find((i) => i[0] === 'storage')!;
      expect(subscribeCall).toBe(undefined);
    });

    it('should not resubscribe for event even if key has changed', () => {
      const { rerender } = renderHook(({ key }) => useStorageValue<string>(adapter, key), {
        initialProps: { key: 'foo' },
      });
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const subscribeCall = addEventListenerSpy.mock.calls.find((i) => i[0] === 'storage')!;
      const storageEventHandler = subscribeCall[1];

      addEventListenerSpy.mockClear();
      removeEventListenerSpy.mockClear();

      rerender({ key: 'bar' });
      expect(removeEventListenerSpy.mock.calls.find((i) => i[1] === storageEventHandler)).toBe(
        undefined
      );
    });

    it('should unsubscribe on unmount', () => {
      const { unmount } = renderHook(() => useStorageValue<string>(adapter, 'foo'));
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const subscribeCall = addEventListenerSpy.mock.calls.find((i) => i[0] === 'storage')!;
      const storageEventHandler = subscribeCall[1];

      addEventListenerSpy.mockClear();
      removeEventListenerSpy.mockClear();

      unmount();
      expect(removeEventListenerSpy.mock.calls.find((i) => i[1] === storageEventHandler)).not.toBe(
        undefined
      );
    });

    it('should update state if managed key is updated, without calls to storage', () => {
      const { result } = renderHook(() => useStorageValue<string>(localStorage, 'foo'));

      expect(result.current[0]).toBe(null);

      localStorage.setItem('foo', 'bar');
      act(() => {
        window.dispatchEvent(
          new StorageEvent('storage', { key: 'foo', storageArea: localStorage, newValue: '"foo"' })
        );
      });

      expect(result.current[0]).toBe('foo');
      localStorage.removeItem('foo');
    });

    it('should not update data on event storage or key mismatch', () => {
      const { result } = renderHook(() => useStorageValue<string>(localStorage, 'foo'));

      expect(result.current[0]).toBe(null);

      act(() => {
        window.dispatchEvent(
          new StorageEvent('storage', {
            key: 'foo',
            storageArea: sessionStorage,
            newValue: '"foo"',
          })
        );
      });
      expect(result.current[0]).toBe(null);

      act(() => {
        window.dispatchEvent(
          new StorageEvent('storage', {
            key: 'bar',
            storageArea: localStorage,
            newValue: 'foo',
          })
        );
      });
      expect(result.current[0]).toBe(null);

      localStorage.removeItem('foo');
    });
  });

  describe('synchronisation', () => {
    it('should update state of all hooks managing same key in same storage', () => {
      const { result: res } = renderHook(() => useStorageValue<string>(localStorage, 'foo'));

      const { result: res1 } = renderHook(() => useStorageValue<string>(localStorage, 'foo'));

      expect(res.current[0]).toBe(null);
      expect(res1.current[0]).toBe(null);

      act(() => {
        res.current[1]('bar');
      });
      expect(res.current[0]).toBe('bar');
      expect(res1.current[0]).toBe('bar');

      act(() => {
        res.current[2]();
      });
      expect(res.current[0]).toBe(null);
      expect(res1.current[0]).toBe(null);

      localStorage.setItem('foo', '"123"');
      act(() => {
        res.current[3]();
      });
      expect(res.current[0]).toBe('123');
      expect(res1.current[0]).toBe('123');
      localStorage.removeItem('foo');
    });

    it('should not synchronize isolated hooks', () => {
      const { result: res } = renderHook(() => useStorageValue<string>(localStorage, 'foo'));

      const { result: res1 } = renderHook(() =>
        useStorageValue<string>(localStorage, 'foo', null, { isolated: true })
      );

      expect(res.current[0]).toBe(null);
      expect(res1.current[0]).toBe(null);

      act(() => {
        res.current[1]('bar');
      });
      expect(res.current[0]).toBe('bar');
      expect(res1.current[0]).toBe(null);

      act(() => {
        res.current[2]();
      });
      expect(res.current[0]).toBe(null);
      expect(res1.current[0]).toBe(null);

      localStorage.setItem('foo', '"123"');
      act(() => {
        res.current[3]();
      });
      act(() => {
        res.current[3]();
      });
      expect(res.current[0]).toBe('123');
      expect(res1.current[0]).toBe(null);
      localStorage.removeItem('foo');
    });

    it('should not be synchronized by isolated hooks', () => {
      const { result: res } = renderHook(() => useStorageValue<string>(localStorage, 'foo'));

      const { result: res1 } = renderHook(() =>
        useStorageValue<string>(localStorage, 'foo', null, { isolated: true })
      );

      expect(res.current[0]).toBe(null);
      expect(res1.current[0]).toBe(null);

      act(() => {
        res1.current[1]('bar');
      });
      expect(res.current[0]).toBe(null);
      expect(res1.current[0]).toBe('bar');

      act(() => {
        res1.current[2]();
      });
      expect(res.current[0]).toBe(null);
      expect(res1.current[0]).toBe(null);

      localStorage.setItem('foo', '"123"');
      act(() => {
        res1.current[3]();
      });
      expect(res.current[0]).toBe(null);
      expect(res1.current[0]).toBe('123');
      localStorage.removeItem('foo');
    });
  });
});
