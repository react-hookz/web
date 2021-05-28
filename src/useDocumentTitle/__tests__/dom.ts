import { renderHook } from '@testing-library/react-hooks/dom';
import { useDocumentTitle } from '../..';

describe('useDocumentTitle', () => {
  it('should be defined', () => {
    expect(useDocumentTitle).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useDocumentTitle('some title'));
    expect(result.error).toBeUndefined();
  });

  it('should unmount without errors', () => {
    const { unmount, result } = renderHook(() =>
      useDocumentTitle('some title', { restoreOnUnmount: true })
    );

    unmount();
    expect(result.error).toBeUndefined();
  });

  it('should set given string to the document title', () => {
    renderHook(() => useDocumentTitle('foo'));
    expect(document.title).toBe('foo');
  });

  it('should pass title through wrapper', () => {
    const wrapper = (str: string) => `${str} bar`;
    renderHook(() => useDocumentTitle('foo', { wrapper }));
    expect(document.title).toBe('foo bar');
  });

  it('should update title if title or wrapper changed', () => {
    let wrapperSpy = (str: string) => `${str} bar`;
    const { rerender } = renderHook(({ title, wrapper }) => useDocumentTitle(title, { wrapper }), {
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
    const { unmount } = renderHook(() => useDocumentTitle('foo', { restoreOnUnmount: true }));
    expect(document.title).toBe('foo');

    unmount();
    expect(document.title).toBe('bar');
  });
});
