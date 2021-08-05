import { renderHook } from '@testing-library/react-hooks/server';
import { useKeyboardEvent } from '../..';

describe('useKeyboardEvent', () => {
  it('should be defined', () => {
    expect(useKeyboardEvent).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useKeyboardEvent('a', () => {}));
    expect(result.error).toBeUndefined();
  });
});
