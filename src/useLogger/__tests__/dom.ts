import { renderHook } from '@testing-library/react-hooks/dom';
import { useLogger } from '../useLogger';

describe('useLogger', () => {
  const originalLog = console.log; // save original console.log function
  beforeEach(() => {
    console.log = jest.fn(); // create a new mock function for each test
  });
  afterAll(() => {
    console.log = originalLog; // restore original console.log after all tests
  });
  it('should return TestComponent mounted on first render', () => {
    renderHook(() => useLogger('TestComponent'));
    expect(console.log).toBeCalledWith('TestComponent mounted');
  });

  it('should return `TestComponent updated` on second and next renders', () => {
    const { result, rerender } = renderHook(() => useLogger('TestComponent'));

    expect(console.log).toBeCalledWith('TestComponent mounted');

    rerender();
    expect(console.log).toBeCalledWith('TestComponent updated');

    rerender();
    expect(console.log).toBeCalledWith('TestComponent updated');
  });
});
