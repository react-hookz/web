import { renderHook } from '@testing-library/react-hooks/dom';
import { useTitle } from '../../src';

describe('useTitle', () => {
  it('should be defined', () => {
    expect(useTitle).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useTitle('some title'));
    expect(result.error).toBeUndefined();
  });

  it('should unmount without errors', () => {
    const { unmount, result } = renderHook(() =>
      useTitle('some title', { restoreOnUnmount: true })
    );

    unmount();
    expect(result.error).toBeUndefined();
  });

  it('should set given string to the document title', () => {
    renderHook(() => useTitle('foo'));
    expect(document.title).toBe('foo');
  });

  it('should pass title through wrapper', () => {
    const wrapper = (str: string) => `${str} bar`;
    renderHook(() => useTitle('foo', { wrapper }));
    expect(document.title).toBe('foo bar');
  });

  it('should update title if title or wrapper changed', () => {
    let wrapperSpy = (str: string) => `${str} bar`;
    const { rerender } = renderHook(({ title, wrapper }) => useTitle(title, { wrapper }), {
      initialProps: { title: 'foo', wrapper: wrapperSpy },
    });
    expect(document.title).toBe('foo bar');

    rerender({ title: 'bar', wrapper: wrapperSpy });
    expect(document.title).toBe('bar bar');

    wrapperSpy = (str: string) => `${str} baz`;
    rerender({ title: 'bar', wrapper: wrapperSpy });
    expect(document.title).toBe('bar baz');
  });

  it('should set previous title in case `restoreOnUnmount` options is truthy', () => {
    document.title = 'bar';
    const { unmount } = renderHook(() => useTitle('foo', { restoreOnUnmount: true }));
    expect(document.title).toBe('foo');

    unmount();
    expect(document.title).toBe('bar');
  });
});
