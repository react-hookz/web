import { renderHook } from '@testing-library/react-hooks/server';
import { useObservable } from '../..';
import { noop } from '../../util/const';

describe('useObservable', () => {
  it('should be defined', () => {
    expect(useObservable).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useObservable({}, noop));
    expect(result.error).toBeUndefined();
  });
});
