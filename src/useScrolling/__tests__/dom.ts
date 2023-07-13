import { renderHook } from '@testing-library/react-hooks/dom';
import { useScrolling } from '../..';

describe('useScrolling', () => {
	it('should be defined', () => {
		expect(useScrolling).toBeDefined();
	});

	it('should render', () => {
		const { result } = renderHook(() => useScrolling());
		expect(result.error).toBeUndefined();
	});
});
