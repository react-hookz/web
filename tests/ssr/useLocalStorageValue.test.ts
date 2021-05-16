import { renderHook } from '@testing-library/react-hooks/server';
import { useLocalStorageValue } from '../../src';

describe('useLocalStorageValue', () => {
  it('should be defined', () => {
    expect(useLocalStorageValue).toBeDefined();
  });

  it('should render', () => {
    renderHook(() => {
      useLocalStorageValue('foo');
    });
  });
});
