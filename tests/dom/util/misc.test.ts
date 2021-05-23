import { off, on } from '../../../src/util/misc';

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
