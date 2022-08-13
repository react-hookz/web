import { renderHook } from '@testing-library/react-hooks/dom';
import { useBattery } from '../..';

// I'm not sure how test it. Do you have some idea?
describe('useBattery', () => {
  it('should be defined', () => {
    expect(useBattery).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useBattery());
    expect(result.error).toBeUndefined();
  });
});
