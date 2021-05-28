import { act, renderHook } from '@testing-library/react-hooks/server';
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

  it('should not fetch value from storage on init', () => {
    const { result } = renderHook(() => useStorageValue(adapter, 'foo'));
    expect(result.current[0]).toBe(undefined);
    expect(adapter.getItem).not.toHaveBeenCalled();
  });

  it('should not set storage value on setState call', () => {
    const { result } = renderHook(() => useStorageValue<string>(adapter, 'foo'));

    expect(result.current[0]).toBe(undefined);
    act(() => {
      result.current[1]('bar');
    });
    expect(result.current[0]).toBe(undefined);
    expect(adapter.setItem).not.toHaveBeenCalled();
  });

  it('should not call storage`s removeItem on item remove', () => {
    adapter.getItem.mockImplementationOnce(() => null);
    const { result } = renderHook(() => useStorageValue<string>(adapter, 'foo', null));

    act(() => {
      result.current[2]();
    });
    expect(adapter.removeItem).not.toHaveBeenCalled();
  });

  it('should not set state to default value on item remove', () => {
    adapter.getItem.mockImplementationOnce(() => '"bar"');
    const { result } = renderHook(() => useStorageValue<string>(adapter, 'foo', 'default value'));

    expect(result.current[0]).toBe(undefined);
    act(() => {
      result.current[2]();
    });
    expect(result.current[0]).toBe(undefined);
  });

  it('should not re-fetch value from store on fetchItem call', () => {
    adapter.getItem.mockImplementationOnce(() => '"bar"');
    const { result } = renderHook(() => useStorageValue<string>(adapter, 'foo', 'default value'));

    expect(adapter.getItem).not.toHaveBeenCalled();
    act(() => {
      result.current[3]();
    });
    expect(adapter.getItem).not.toHaveBeenCalled();
  });

  it('should not store initially default value to storage if configured', () => {
    adapter.getItem.mockImplementationOnce(() => null);
    const { result } = renderHook(() =>
      useStorageValue<string>(adapter, 'foo', 'default value', {
        storeDefaultValue: true,
      })
    );

    expect(result.current[0]).toBe(undefined);
    expect(adapter.setItem).not.toHaveBeenCalled();
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
});
