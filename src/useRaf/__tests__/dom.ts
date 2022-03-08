import { renderHook } from '@testing-library/react-hooks/dom';
import { useRaf } from '../..';

describe('useRafCallback', () => {
  const raf = global.requestAnimationFrame;
  const caf = global.cancelAnimationFrame;

  beforeAll(() => {
    jest.useFakeTimers();

    global.requestAnimationFrame = (cb) => setTimeout(cb);
    global.cancelAnimationFrame = (cb) => clearTimeout(cb);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  afterAll(() => {
    jest.useRealTimers();

    global.requestAnimationFrame = raf;
    global.cancelAnimationFrame = caf;
  });

  it('should be defined', () => {
    expect(useRaf).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useRaf());
    expect(result.error).toBeUndefined();
  });

  it('should init percentage of time elapsed', () => {
    const { result } = renderHook(() => useRaf());
    const timeElapsed = result.current;

    expect(timeElapsed).toBe(0);
  });

  // TODO: writing more tests require raf stub. no implementation is available in TS.
  // Need to look into it
});
