import { renderHook } from '@testing-library/react-hooks/dom';
import { useLifecycleLogger } from '../useLifecycleLogger';

describe('useLifecycleLogger', () => {
  const originalLog = console.log; // save original console.log function
  beforeEach(() => {
    console.log = jest.fn(); // create a new mock function for each test
  });
  afterAll(() => {
    console.log = originalLog; // restore original console.log after all tests
  });
  it('should return TestComponent mounted on first render', () => {
    const dep = 'test';
    renderHook(() => useLifecycleLogger('TestComponent', [dep]));
    expect(console.log).toBeCalledWith('TestComponent mounted', { '0': 'test' });
  });

  it('should return `TestComponent updated` on second and next renders', () => {
    const { rerender } = renderHook(() => useLifecycleLogger('TestComponent'));

    expect(console.log).toBeCalledWith('TestComponent mounted', {});

    rerender();
    expect(console.log).toBeCalledWith('TestComponent updated', {});

    rerender();
    expect(console.log).toBeCalledWith('TestComponent updated', {});
  });
});
