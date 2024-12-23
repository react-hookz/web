import {type Mocked, vi} from 'vitest';

export const newStorage = (
	get: Storage['getItem'] = () => null,
	set: Storage['setItem'] = () => {},
	remove: Storage['removeItem'] = () => {},
) => ({
	getItem: vi.fn(get),
	setItem: vi.fn(set),
	removeItem: vi.fn(remove),
} as unknown as Mocked<Storage>);
