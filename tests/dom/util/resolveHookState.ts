import { resolveHookState } from '../../../src/util/resolveHookState';

describe('resolveHookState', () => {
  it('it should be defined', () => {
    expect(resolveHookState).toBeDefined();
  });

  it('should return value itself if it is not function', () => {
    expect(resolveHookState(123)).toBe(123);

    const obj = { foo: 'bar' };
    expect(resolveHookState(obj)).toBe(obj);
  });

  it('should return call result in case function received', () => {
    expect(resolveHookState(() => 123)).toBe(123);

    const obj = { foo: 'bar' };
    expect(resolveHookState(() => obj)).toBe(obj);
  });

  it('should pass second parameter to received function', () => {
    expect(resolveHookState((state) => state, 123)).toBe(123);

    const obj = { foo: 'bar' };
    expect(resolveHookState((state) => state, obj)).toBe(obj);
  });
});
