import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useStorageValue } from '../../src';

describe('useStorageValue', () => {
  it('should be defined', () => {
    expect(useStorageValue).toBeDefined();
  });

  const adapter = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  };

  beforeEach(() => {
    adapter.getItem.mockReset();
    adapter.setItem.mockReset();
    adapter.removeItem.mockReset();
  });

  it('should render', () => {
    renderHook(() => useStorageValue(adapter, 'foo'));
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

  it('should pass value through JSON.parse during fetch in on-raw mode', () => {
    const JSONParseSpy = jest.spyOn(JSON, 'parse');
    adapter.getItem.mockImplementationOnce((key) => `"${key}"`);
    const { result } = renderHook(() => useStorageValue(adapter, 'foo'));
    expect(result.current[0]).toBe('foo');
    expect(JSONParseSpy).toHaveBeenCalledWith('"foo"');
    JSONParseSpy.mockRestore();
  });

  it('should not pass value through JSON.parse during fetch in raw mode', () => {
    const JSONParseSpy = jest.spyOn(JSON, 'parse');
    adapter.getItem.mockImplementationOnce((key) => `"${key}"`);
    const { result } = renderHook(() => useStorageValue(adapter, 'foo', null, { raw: true }));
    expect(result.current[0]).toBe('"foo"');
    expect(JSONParseSpy).not.toHaveBeenCalled();
    JSONParseSpy.mockRestore();
  });

  it('should pass value through provided deserializer during fetch in on-raw mode', () => {
    adapter.getItem.mockImplementationOnce((key) => `"${key}"`);
    const deserializerSpy = jest.fn((val) => JSON.parse(val));
    const { result } = renderHook(() =>
      useStorageValue(adapter, 'foo', null, { deserializer: deserializerSpy })
    );
    expect(result.current[0]).toBe('foo');
    expect(deserializerSpy).toHaveBeenCalledWith('"foo"');
  });

  it('should yield default value in case of storage returned null during fetch', () => {
    adapter.getItem.mockImplementationOnce(() => null);
    const { result } = renderHook(() => useStorageValue(adapter, 'foo', 'defaultValue'));
    expect(result.current[0]).toBe('defaultValue');
    expect(adapter.getItem).toHaveBeenCalledWith('foo');
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

  it('should call JSON.stringify on setState call in non-raw mode', () => {
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

  it('should call provided serializer on setState call in non-raw mode', () => {
    const serializerSpy = jest.fn((v) => JSON.stringify(v));
    adapter.getItem.mockImplementationOnce(() => null);
    const { result } = renderHook(() =>
      useStorageValue<string>(adapter, 'foo', null, { serializer: serializerSpy })
    );

    expect(result.current[0]).toBe(null);
    act(() => {
      result.current[1]('bar');
    });
    expect(result.current[0]).toBe('bar');
    expect(serializerSpy).toHaveBeenCalledWith('bar');
  });

  it('should throw in case non-string value been set in raw mode', () => {
    adapter.getItem.mockImplementationOnce(() => null);
    const { result } = renderHook(() =>
      useStorageValue<string>(adapter, 'foo', null, { raw: true })
    );

    expect(() => {
      act(() => {
        // @ts-expect-error testing inappropriate usage
        result.current[1](123);
      });
    }).toThrow(
      new TypeError('value has to be a string, define serializer or cast it to string manually')
    );
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
    adapter.getItem.mockImplementationOnce(() => 'bar');
    const { result } = renderHook(() =>
      useStorageValue<string>(adapter, 'foo', 'default value', { raw: true })
    );

    expect(result.current[0]).toBe('bar');
    act(() => {
      result.current[2]();
    });
    expect(result.current[0]).toBe('default value');
  });

  it('should refetch value from store on fetchItem call', () => {
    adapter.getItem.mockImplementationOnce(() => 'bar');
    const { result } = renderHook(() =>
      useStorageValue<string>(adapter, 'foo', 'default value', { raw: true })
    );

    expect(adapter.getItem).toHaveBeenCalledTimes(1);
    expect(result.current[0]).toBe('bar');
    adapter.getItem.mockImplementationOnce(() => 'baz');
    act(() => {
      result.current[3]();
    });
    expect(adapter.getItem).toHaveBeenCalledTimes(2);
    expect(result.current[0]).toBe('baz');
  });

  it('should refetch value on key change', () => {
    adapter.getItem.mockImplementation((key) => key);
    const { result, rerender } = renderHook(
      ({ key }) => useStorageValue<string>(adapter, key, 'default value', { raw: true }),
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
        raw: true,
        storeDefaultValue: true,
      })
    );

    expect(result.current[0]).toBe('default value');
    expect(adapter.setItem).toHaveBeenCalledWith('foo', 'default value');
  });

  it('should store default value if it became default after initial render', () => {
    adapter.getItem.mockImplementationOnce(() => 'bar');
    const { result } = renderHook(() =>
      useStorageValue<string>(adapter, 'foo', 'default value', {
        raw: true,
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
    expect(adapter.setItem).toHaveBeenCalledWith('foo', 'default value');
  });

  it('should not store default value on rerenders with persisted state', () => {
    adapter.getItem.mockImplementationOnce(() => null);
    const { result, rerender } = renderHook(() =>
      useStorageValue<string>(adapter, 'foo', 'default value', {
        raw: true,
        storeDefaultValue: true,
      })
    );

    expect(result.current[0]).toBe('default value');
    expect(adapter.setItem).toHaveBeenCalledWith('foo', 'default value');
    rerender();
    rerender();
    rerender();
    expect(adapter.setItem).toHaveBeenCalledTimes(1);
  });

  it('should not store null default value to store', () => {
    adapter.getItem.mockImplementationOnce(() => null);
    renderHook(() =>
      useStorageValue<string>(adapter, 'foo', null, {
        raw: true,
        storeDefaultValue: true,
      })
    );

    expect(adapter.setItem).not.toHaveBeenCalled();
  });
});
