import {renderHook} from '@testing-library/react-hooks/server';
import {describe, expect, it} from 'vitest';
import {useControlledRerenderState} from '../index.js';

describe('useControlledRerenderState', () => {
	it('should be defined', () => {
		expect(useControlledRerenderState).toBeDefined();
	});

	it('should render', () => {
		const {result} = renderHook(() => useControlledRerenderState());
		expect(result.error).toBeUndefined();
	});
});
