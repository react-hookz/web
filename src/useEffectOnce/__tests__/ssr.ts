import { renderHook } from '@testing-library/react-hooks/server';
import { useEffectOnce } from '../..';

describe('useEffectOnce', () => {
  it('should be defined', () => {
    expect(useEffectOnce).toBeDefined();
  });
  it('should call effector only on first render', () => {
    const spy = jest.fn();

    renderHook(() => useEffectOnce(spy));

    expect(spy).toHaveBeenCalledTimes(0);
  });
});
