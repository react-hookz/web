import { renderHook } from '@testing-library/react-hooks/server';
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
});
