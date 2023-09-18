import { useWindowSize } from '../..';
import { renderHookServer } from '../../__tests__/ssr-render-hook';

describe('useWindowSize', () => {
	it('should be defined', () => {
		expect(useWindowSize).toBeDefined();
	});

	it('should render', () => {
		expect(() => {
			renderHookServer(() => useWindowSize());
		}).not.toThrow();
	});
});
