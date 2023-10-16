/* eslint-disable max-nested-callbacks */
import { resolveHookState } from '../..';
import { basicDepsComparator, off, on } from '../misc';

describe('resolveHookState', () => {
	it('should be defined', () => {
		expect(resolveHookState).toBeDefined();
	});

	it('should return value itself if it is not function', () => {
		expect(resolveHookState(123)).toBe(123);

		const object = { foo: 'bar' };
		expect(resolveHookState(object)).toBe(object);
	});

	it('should return call result in case function received', () => {
		expect(resolveHookState(() => 123)).toBe(123);

		const object = { foo: 'bar' };
		expect(resolveHookState(() => object)).toBe(object);
	});

	it('should pass second parameter to received function', () => {
		expect(resolveHookState((state) => state, 123)).toBe(123);

		const object = { foo: 'bar' };
		expect(resolveHookState((state) => state, object)).toBe(object);
	});
});

const cb = () => {};

describe('misc', () => {
	describe('on', () => {
		it("should call object's `addEventListener` with passed parameters", () => {
			const object = {
				addEventListener: jest.fn(),
			};
			on(object as unknown as EventTarget, 'evtName', cb);
			expect(object.addEventListener).toHaveBeenCalledWith('evtName', cb);
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
			const object = {
				removeEventListener: jest.fn(),
			};

			off(object as unknown as EventTarget, 'evtName', cb);
			expect(object.removeEventListener).toHaveBeenCalledWith('evtName', cb);
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
