import { useVibrate } from '../..';
import { renderHookServer } from '../../__tests__/ssr-render-hook';

describe('useVibrate', () => {
	it('should be defined', () => {
		expect(useVibrate).toBeDefined();
	});

	it('should render', () => {
		expect(() => {
			renderHookServer(() => {
				useVibrate(true, 100);
			});
		}).not.toThrow();
	});
});
