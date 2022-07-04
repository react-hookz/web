import { renderHook } from '@testing-library/react-hooks/dom';
import { useLifecycleLogger } from '../useLifecycleLogger';

describe('useLifecycleLogger', () => {
  let logSpy: jest.SpyInstance;

  beforeAll(() => {
    logSpy = jest.spyOn(console, 'log');
  });

  afterAll(() => {
    logSpy.mockRestore();
  });

  beforeEach(() => {
    logSpy.mockReset();
  });

  it('should log whole component lifecycle', () => {
    const { unmount, rerender } = renderHook(
      ({ deps }) => {
        useLifecycleLogger('TestComponent', deps);
      },
      { initialProps: { deps: [1, 2, 3] } }
    );

    expect(logSpy).toBeCalledTimes(1);
    expect(logSpy).toBeCalledWith(`TestComponent mounted`, [1, 2, 3]);

    rerender({ deps: [3, 2, 1] });

    expect(logSpy).toBeCalledTimes(2);
    expect(logSpy).toBeCalledWith(`TestComponent updated`, [3, 2, 1]);

    rerender({ deps: [1, 5, 6] });

    expect(logSpy).toBeCalledTimes(3);
    expect(logSpy).toBeCalledWith(`TestComponent updated`, [1, 5, 6]);

    unmount();

    expect(logSpy).toBeCalledTimes(4);
    expect(logSpy).toBeCalledWith(`TestComponent unmounted`);
  });
});
