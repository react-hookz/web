import { renderHook } from '@testing-library/react-hooks/server';
import { useEventListener } from '#root/index.js';

describe('useEventListener', () => {
	it('should be defined', () => {
		expect(useEventListener).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => {
			useEventListener(null, 'random name', () => {});
		});
		expect(result.error).toBeUndefined();
	});
});
