import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useFreezeProp, useToggle } from '../..';

describe('useFreezeProp', () => {
  it('should be defined', () => {
    expect(useFreezeProp).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => {
      const mockProp = { isPermanent: true };

      return useFreezeProp(mockProp);
    });
    expect(result.error).toBeUndefined();
  });

  it('should freeze prop', () => {
    const {
      result: { current: hook },
    } = renderHook(() => {
      const [toggle, setToggle] = useToggle(true);
      const freezeProp = useFreezeProp(toggle);

      return { setToggle, freezeProp };
    });

    expect(hook.freezeProp.current).toBeTruthy();

    act(() => {
      hook.setToggle();
    });

    expect(hook.freezeProp.current).toBeTruthy();
  });

  it('should throw error when try assing new value', () => {
    const { result } = renderHook(() => useFreezeProp('hello'));

    expect(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      result.current = 'world';
    }).toThrowError();
  });
});
