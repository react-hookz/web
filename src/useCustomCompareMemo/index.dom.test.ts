import {renderHook} from '@ver0/react-hooks-testing';
import {describe, expect, it} from 'vitest';
import {useCustomCompareMemo} from '../index.js';

const mockUser = {name: 'John'};

type User = typeof mockUser;

describe('useCustomCompareMemo', () => {
	it('should be defined', async () => {
		expect(useCustomCompareMemo).toBeDefined();
	});

	it('should render', async () => {
		const {result} = await renderHook(() =>
			useCustomCompareMemo(
				() => mockUser,
				[],
				() => true,
			),
		);

		expect(result.error).toBeUndefined();
	});

	it("should't invoke factory function on each rerender", async () => {
		type Props = {user: User};
		const {result, rerender} = await renderHook(
			({user}: Props) =>
				useCustomCompareMemo(
					() => user,
					[user],
					() => true,
				),
			{initialProps: {user: mockUser}},
		);

		await rerender({user: {name: 'Jack'}});

		expect(result.value).toBe(mockUser);
	});

	it('should invoke factory function when user name is not the same', async () => {
		type Props = {user: User};
		const {result, rerender} = await renderHook(
			({user}: Props) =>
				useCustomCompareMemo(
					() => user,
					[user],
					(savedDeps, deps) => savedDeps[0].name === deps[0].name,
				),
			{initialProps: {user: mockUser}},
		);

		await rerender({user: {name: 'John'}});

		expect(result.value).toBe(mockUser);

		const newUser = {name: 'Mike'};
		await rerender({user: newUser});

		expect(result.value).toBe(newUser);
	});
});
