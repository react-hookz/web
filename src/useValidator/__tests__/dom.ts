import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useValidator } from '../..';
import { UseValidatorReturn } from '../useValidator';

describe('useValidator', () => {
  it('should be defined', () => {
    expect(useValidator).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useValidator(() => ({ isValid: false }), []));
    expect(result.error).toBeUndefined();
  });

  it('should return undefined validity on first render', () => {
    const { result } = renderHook(() => useValidator(() => ({ isValid: true }), []));
    expect((result.all[0] as UseValidatorReturn<{ isValid: boolean }>)[0].isValid).toBeUndefined();
  });

  it('should apply initial state parameter', () => {
    const { result } = renderHook(() =>
      useValidator(() => ({ isValid: true }), [], { isValid: true })
    );
    expect((result.all[0] as UseValidatorReturn<{ isValid: boolean }>)[0].isValid).toBe(true);
  });

  it('should call validator on first render', () => {
    const spy = jest.fn(() => ({ isValid: true }));
    const { result } = renderHook(() => useValidator(spy, []));
    expect(spy).toHaveBeenCalledTimes(1);
    expect(result.current[0].isValid).toBe(true);
  });

  it('should call validator on if deps changed', () => {
    const spy = jest.fn(() => ({ isValid: true }));
    const { rerender } = renderHook(({ dep }) => useValidator(spy, [dep]), {
      initialProps: { dep: 1 },
    });
    expect(spy).toHaveBeenCalledTimes(1);

    rerender({ dep: 2 });
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should call validator on revalidator invocation', () => {
    const spy = jest.fn(() => ({ isValid: true }));
    const { result } = renderHook(({ dep }) => useValidator(spy, [dep]), {
      initialProps: { dep: 1 },
    });
    expect(spy).toHaveBeenCalledTimes(1);

    act(() => {
      result.current[1]();
    });
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should pass the validity setter if validator expects it', () => {
    const { result } = renderHook(() =>
      useValidator<{ isValid: false; customError: Error }>((d) => {
        d({ isValid: false, customError: new Error('this is custom error') });
      }, [])
    );

    expect(result.current[0]).toStrictEqual({
      isValid: false,
      customError: new Error('this is custom error'),
    });
  });
});
