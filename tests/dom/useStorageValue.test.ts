import { renderHook } from '@testing-library/react-hooks/dom';
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

  it('should fetch value from storage on init', () => {
    adapter.getItem.mockImplementationOnce((key) => `"${key}"`);
    const { result } = renderHook(() => useStorageValue(adapter, 'foo'));
    expect(result.current[0]).toBe('foo');
    expect(adapter.getItem).toHaveBeenCalledWith('foo');
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
});
