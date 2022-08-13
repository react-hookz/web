import { renderHook } from '@testing-library/react-hooks/dom';
import { useObservable } from '../..';
import { noop } from '../../util/const';

// I'm not sure how test it. Do you have some idea?
describe('useObservable', () => {
  it('should be defined', () => {
    expect(useObservable).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useObservable({}, noop));
    expect(result.error).toBeUndefined();
  });
});
