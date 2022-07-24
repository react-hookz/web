import { useCallback } from 'react';
import { useSafeState } from '..';

export type CopyToClipboardState =
  | {
      value: undefined;
      success: undefined;
      error: undefined;
    }
  | {
      value: string;
      success: true;
      error?: undefined;
    }
  | {
      success: false;
      value?: undefined;
      error: Error;
    };

const initialState: CopyToClipboardState = {
  value: undefined,
  success: undefined,
  error: undefined,
};

/**
 * Utility to copy some text to clipboard with additionnal checks to avoid unexpected errors and
 * to keep async logic out of `copyToClipboard` callback that would change its return type to
 * `Promise<void>` which could unnecessarily complexify calling contexts.
 * @param textToCopy text to copy to the clipboard, must be a string
 */
async function performCopyToClipboard(textToCopy: string): Promise<void> {
  try {
    if (typeof textToCopy !== 'string') {
      throw new TypeError('Data to copy must be a string');
    }

    if (!navigator.clipboard) {
      throw new Error('Clipboard API not supported by the browser');
    }

    await navigator.clipboard.writeText(textToCopy);
  } catch (error) {
    let parsedError: Error;
    if (error instanceof Error) {
      parsedError = error;
    } else if (typeof error === 'string') {
      parsedError = new Error(error);
    } else {
      parsedError = new Error('Unexpected error occured copying data to clipboard');
    }
    throw parsedError;
  }
}

export function useCopyToClipboard(): [
  copyState: CopyToClipboardState,
  copyToClipboard: (text: string) => void,
  resetCopyState: () => void
] {
  const [copyState, setCopyState] = useSafeState<CopyToClipboardState>(initialState);

  const resetState = useCallback(() => {
    setCopyState(initialState);
  }, [setCopyState]);

  const copyToClipboard = useCallback(
    (text: string) => {
      performCopyToClipboard(text)
        .then(() => setCopyState({ success: true, value: text }))
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.warn(error);
          // error casted as Error because ensured by performCopyToClipboard's try/catch
          setCopyState({ success: false, error: error as Error });
        });
    },
    [setCopyState]
  );

  return [copyState, copyToClipboard, resetState];
}
