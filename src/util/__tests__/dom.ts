import { resolveHookState } from '../resolveHookState';
import { off, on } from '../misc';

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

describe('misc', () => {
  describe('on', () => {
    it("should call object's `addEventListener` with passed parameters", () => {
      const obj = {
        addEventListener: jest.fn(),
      };

      const cb = () => {};
      on(obj as unknown as EventTarget, 'evtName', cb);
      expect(obj.addEventListener).toBeCalledWith('evtName', cb);
    });
    it("should not throw in case 'undefined' element passed", () => {
      expect(() => {
        // @ts-expect-error testing inappropriate usage
        on(undefined, 'evtName', () => {});
      }).not.toThrow();
    });
  });

  describe('off', () => {
    it("should call object's `removeEventListener` with passed parameters", () => {
      const obj = {
        removeEventListener: jest.fn(),
      };

      const cb = () => {};
      off(obj as unknown as EventTarget, 'evtName', cb);
      expect(obj.removeEventListener).toBeCalledWith('evtName', cb);
    });

    it("should not throw in case 'undefined' element passed", () => {
      expect(() => {
        // @ts-expect-error testing inappropriate usage
        off(undefined, 'evtName', () => {});
      }).not.toThrow();
    });
  });
});
