import {renderHook} from '@testing-library/react-hooks/server';
import {useValidator} from '../../index.js';

describe('useValidator', () => {
	it('should be defined', () => {
		expect(useValidator).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useValidator(() => ({isValid: false}), []));
		expect(result.error).toBeUndefined();
	});

	it('should return undefined validity on first render', () => {
		const {result} = renderHook(() => useValidator(() => ({isValid: true}), []));
		expect(result.current[0].isValid).toBeUndefined();
	});

	it('should not call validator on first render', () => {
		const spy = jest.fn(() => ({isValid: true}));
		renderHook(() => useValidator(spy, []));
		expect(spy).not.toHaveBeenCalled();
	});
});
