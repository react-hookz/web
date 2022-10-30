import { resolveHookState } from '../..';
import { basicDepsComparator, off, on } from '../misc';

describe('resolveHookState', () => {
  it('should be defined', () => {
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

const cb = () => {};

describe('misc', () => {
  describe('on', () => {
    it("should call object's `addEventListener` with passed parameters", () => {
      const obj = {
        addEventListener: jest.fn(),
      };
      on(obj as unknown as EventTarget, 'evtName', cb);
      expect(obj.addEventListener).toHaveBeenCalledWith('evtName', cb);
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

      off(obj as unknown as EventTarget, 'evtName', cb);
      expect(obj.removeEventListener).toHaveBeenCalledWith('evtName', cb);
    });

    it("should not throw in case 'undefined' element passed", () => {
      expect(() => {
        // @ts-expect-error testing inappropriate usage
        off(undefined, 'evtName', () => {});
      }).not.toThrow();
    });
  });

  describe('basicDepsComparator', () => {
    it('should return true if both arrays ref-equal', () => {
      const d1 = [1, 2, 3];
      expect(basicDepsComparator(d1, d1)).toBe(true);
    });

    it('should return false in case array has different length', () => {
      expect(basicDepsComparator([1], [1, 2])).toBe(false);
    });

    it('should return false in respective elements not equal', () => {
      expect(basicDepsComparator([1, 2, 3], [1, 3, 2])).toBe(false);
    });

    it('should return true in case arrays are equal', () => {
      expect(basicDepsComparator([1, 2, 3], [1, 2, 3])).toBe(true);
    });
  });
});
