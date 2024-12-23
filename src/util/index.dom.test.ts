import {describe, expect, it, vi} from 'vitest';
import {basicDepsComparator, off, on} from './misc.js';

const cb = () => {};

describe('misc', () => {
	describe('on', () => {
		it("should call object's `addEventListener` with passed parameters", () => {
			const object = {
				addEventListener: vi.fn(),
			};
			on(object as unknown as EventTarget, 'evtName', cb);
			expect(object.addEventListener).toHaveBeenCalledWith('evtName', cb);
		});
		it("should not throw in case 'undefined' element passed", () => {
			expect(() => {
				// @ts-expect-error testing inappropriate usage
				// eslint-disable-next-line max-nested-callbacks
				on(undefined, 'evtName', () => {});
			}).not.toThrow();
		});
	});

	describe('off', () => {
		it("should call object's `removeEventListener` with passed parameters", () => {
			const object = {
				removeEventListener: vi.fn(),
			};

			off(object as unknown as EventTarget, 'evtName', cb);
			expect(object.removeEventListener).toHaveBeenCalledWith('evtName', cb);
		});

		it("should not throw in case 'undefined' element passed", () => {
			expect(() => {
				// @ts-expect-error testing inappropriate usage
				// eslint-disable-next-line max-nested-callbacks
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
