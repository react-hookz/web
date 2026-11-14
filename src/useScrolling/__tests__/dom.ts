import { act, renderHook } from '@testing-library/react-hooks';
import { useScrolling } from '..';

describe('useScrolling', () => {
	it('should be defined', () => {
		expect(useScrolling).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useScrolling({ current: null }));
		expect(result.error).toBeUndefined();
	});

	it('should return false while ref is null', async () => {
		const { result } = renderHook(() => useScrolling({ current: null }));
		expect(result.current).toBe(false);
	});

	it('should return true while scrolling', async () => {
		const div = document.createElement('div');
		const { result, waitForNextUpdate } = renderHook(() => useScrolling({ current: div }));
		const scrollEvent = new window.Event('scroll');
		act(() => {
			div.dispatchEvent(scrollEvent);
		});

		expect(result.current).toBe(true);
		await waitForNextUpdate();
		expect(result.current).toBe(false);
	});
});
