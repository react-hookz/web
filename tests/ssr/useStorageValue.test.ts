import { renderHook, act } from '@testing-library/react-hooks/server';
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

  it('should not fetch value from storage on init', () => {
    const { result } = renderHook(() => useStorageValue(adapter, 'foo'));
    expect(result.current[0]).toBe(undefined);
    expect(adapter.getItem).not.toHaveBeenCalled();
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
