import { renderHook } from '@testing-library/react-hooks/server';
import { useSessionStorageValue } from '../../src';

describe('useSessionStorageValue', () => {
  it('should be defined', () => {
    expect(useSessionStorageValue).toBeDefined();
  });

  it('should render', () => {
    renderHook(() => {
      useSessionStorageValue('foo');
    });
  });
});
