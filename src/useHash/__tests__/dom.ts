import { act } from '@testing-library/react-hooks';
import { renderHook } from '@testing-library/react-hooks/dom';

import { useHash } from '../useHash';

describe('useHash', () => {
  it('should be defined', () => {
    expect(useHash).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useHash());
    expect(result.error).toBeUndefined();
  });

  it('should return value from location.hash', () => {
    const expectedHash = '#Examples';
    window.location.hash = expectedHash;

    const { result } = renderHook(useHash);

    const [hash] = result.current;
    expect(hash).toBe(expectedHash);
  });

  it('should return new value when location.hash changes', () => {
    window.location.hash = '';

    const { result } = renderHook(useHash);
    const newHash = '#Examples';
    act(() => {
      window.location.hash = newHash;
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });

    const [hash] = result.current;
    expect(hash).toBe(newHash);
  });

  it('should update hash when setting hash', () => {
    window.location.hash = '';

    const { result } = renderHook(useHash);
    const newHash = '#Examples';
    const [, setHash] = result.current;
    setHash(newHash);

    expect(window.location.hash).toBe(newHash);
  });
});
