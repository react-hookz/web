import { renderHook } from '@testing-library/react-hooks/dom';
import { fireEvent, render } from '@testing-library/react';
import React, { useReducer, useEffect } from 'react';
import { useStateRef } from '../../index';

describe('useStateRef', () => {
  it('should be defined', () => {
    expect(useStateRef).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useStateRef(() => null));
    expect(result.error).toBeUndefined();
  });

  it('should resolve `refCallback`', () => {
    const Component = () => {
      const [stateRef, setStateRef] = useStateRef(
        (node: HTMLDivElement | null) => node?.tagName.toLowerCase() ?? 'none'
      );

      return (
        <div ref={setStateRef}>
          <p>my parent is {stateRef}</p>
        </div>
      );
    };

    const { getByText } = render(<Component />);

    getByText('my parent is div');
  });

  it('should call once', () => {
    const spy = jest.fn();
    const Component = () => {
      const [stateRef, setStateRef] = useStateRef((node: HTMLDivElement | null) => {
        spy();

        return node?.tagName.toLowerCase() ?? 'none';
      });
      const force = useReducer((state) => !state, false)[1];

      return (
        <div>
          <div ref={setStateRef}>
            <p>my parent is {stateRef}</p>
          </div>
          <button type="button" onClick={force}>
            force
          </button>
        </div>
      );
    };

    const { getByText } = render(<Component />);

    getByText('my parent is div');

    fireEvent.click(getByText('force'));
    fireEvent.click(getByText('force'));
    fireEvent.click(getByText('force'));

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call on unmount', () => {
    const spy = jest.fn();

    const Child = () => {
      const [stateRef, setStateRef] = useStateRef((node: HTMLDivElement | null) => {
        spy();

        return node?.tagName.toLowerCase() ?? 'none';
      });

      return (
        <div>
          <div ref={setStateRef}>
            <p>my parent is {stateRef}</p>
          </div>
        </div>
      );
    };
    const Parent = () => {
      const [displayChild, toggle] = useReducer((state) => !state, true);

      return (
        <>
          {displayChild && <Child />}
          <button type="button" onClick={toggle}>
            toggle component
          </button>
        </>
      );
    };

    const { getByText } = render(<Parent />);

    getByText('my parent is div');
    expect(spy).toHaveBeenCalledTimes(1);

    fireEvent.click(getByText('toggle component'));

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should call before `useEffect`', () => {
    const refCallbackSpy = jest.fn();
    const effectSpy = jest.fn();

    const Component = () => {
      const [stateRef, setStateRef] = useStateRef((node: HTMLDivElement | null) => {
        refCallbackSpy();

        return node?.tagName.toLowerCase() ?? 'none';
      });

      useEffect(() => {
        if (!refCallbackSpy.mock.calls.length) {
          effectSpy();
        }
      });

      return (
        <div ref={setStateRef}>
          <p>my parent is {stateRef}</p>
        </div>
      );
    };

    const { getByText } = render(<Component />);

    getByText('my parent is div');

    expect(refCallbackSpy).toHaveBeenCalledTimes(1);
    expect(effectSpy).not.toHaveBeenCalled();
  });
});
