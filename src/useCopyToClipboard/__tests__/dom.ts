import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useCopyToClipboard } from '../..';

describe('useCopyToClipboard', () => {
  let mockWriteText: jest.Mock;
  let warnSpy: jest.SpyInstance;
  const originalClipboard = {
    ...global.navigator.clipboard,
  };

  const mockTextToCopy = 'react-hookz';

  afterAll(() => {
    Object.assign(navigator, {
      clipboard: originalClipboard,
    });
    jest.resetAllMocks();
  });

  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: () => {},
      },
    });

    mockWriteText = jest.fn().mockImplementation(
      () =>
        new Promise<void>((resolve) => {
          resolve();
        })
    );
    jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(mockWriteText);
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    warnSpy.mockRestore();
  });

  it('should be defined', () => {
    expect(useCopyToClipboard).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useCopyToClipboard());
    expect(result.error).toBeUndefined();
  });

  it('should copy text into clipboard state', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCopyToClipboard());

    await act(() => {
      result.current[1](mockTextToCopy);
      return waitForNextUpdate();
    });

    expect(result.current[0].success).toBeTruthy();
    expect(result.current[0].value).toEqual(mockTextToCopy);
  });

  it('should call native API to copy into clipboard', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCopyToClipboard());

    await act(() => {
      result.current[1](mockTextToCopy);
      return waitForNextUpdate();
    });

    expect(mockWriteText).toHaveBeenCalledTimes(1);
    expect(mockWriteText).toHaveBeenCalledWith(mockTextToCopy);
  });

  it('should reset copy state when resetState called', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCopyToClipboard());

    await act(() => {
      result.current[1](mockTextToCopy);
      return waitForNextUpdate();
    });

    expect(result.current[0].success).toBeTruthy();
    expect(result.current[0].value).toEqual(mockTextToCopy);

    await act(() => {
      result.current[2]();
      return waitForNextUpdate();
    });

    expect(result.current[0].success).toBeUndefined();
    expect(result.current[0].value).toBeUndefined();
    expect(result.current[0].error).toBeUndefined();
  });

  it('should set error when clipboard API not supported', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCopyToClipboard());
    Object.assign(global.navigator, {
      clipboard: undefined,
    });

    await act(() => {
      result.current[1](mockTextToCopy);
      return waitForNextUpdate();
    });

    expect(mockWriteText).not.toHaveBeenCalled();
    expect(result.current[0].error).toEqual(
      new Error('Clipboard API not supported by the browser')
    );
    expect(result.current[0].success).toEqual(false);
  });

  it.each([null, undefined, 9, ['a', 'b', 'c'], { a: 0 }])(
    'should set error when trying to copy %s',
    async (value) => {
      const { result, waitForNextUpdate } = renderHook(() => useCopyToClipboard());

      await act(() => {
        result.current[1](value as unknown as string);
        return waitForNextUpdate();
      });

      expect(result.current[0].success).toEqual(false);
      expect(result.current[0].error).toEqual(new Error('Data to copy must be a string'));
    }
  );

  it('should set rejection error when proper error', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCopyToClipboard());
    const mockedError = new Error('Unexpected error');
    const mockWriteTextWithError = jest.fn().mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          reject(mockedError);
        })
    );
    jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(mockWriteTextWithError);

    await act(() => {
      result.current[1](mockTextToCopy);
      return waitForNextUpdate();
    });

    expect(warnSpy).toBeCalledWith(mockedError);
    expect(mockWriteTextWithError).toHaveBeenCalledWith(mockTextToCopy);
    expect(result.current[0].success).toEqual(false);
    expect(result.current[0].error).toBe(mockedError);
    expect(result.current[0].value).toBeUndefined();
  });

  it('should wrap rejection reason in error when string passed as reject param', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCopyToClipboard());
    const mockedErrorMessage = 'Custom unexpected error';
    const expectedError = new Error(mockedErrorMessage);
    const mockWriteTextWithError = jest.fn().mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(mockedErrorMessage);
        })
    );
    jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(mockWriteTextWithError);

    await act(() => {
      result.current[1](mockTextToCopy);
      return waitForNextUpdate();
    });

    expect(warnSpy).toHaveBeenCalledWith(expectedError);
    expect(mockWriteTextWithError).toHaveBeenCalledWith(mockTextToCopy);
    expect(result.current[0].success).toEqual(false);
    expect(result.current[0].error).toEqual(expectedError);
    expect(result.current[0].value).toBeUndefined();
  });

  it('should create unexpected error otherwise', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useCopyToClipboard());
    const expectedError = new Error('Unexpected error occured copying data to clipboard');
    const mockWriteTextWithError = jest.fn().mockImplementation(
      () =>
        new Promise((resolve, reject) => {
          reject();
        })
    );
    jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(mockWriteTextWithError);

    await act(() => {
      result.current[1](mockTextToCopy);
      return waitForNextUpdate();
    });

    expect(warnSpy).toHaveBeenCalledWith(expectedError);
    expect(mockWriteTextWithError).toHaveBeenCalledWith(mockTextToCopy);
    expect(result.current[0].success).toEqual(false);
    expect(result.current[0].error).toEqual(expectedError);
    expect(result.current[0].value).toBeUndefined();
  });
});
