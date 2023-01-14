import { useMemo } from 'react';
import { isBrowser } from '../util/const';

interface ClipboardMethods {
  read: (onSuccess: (clipText: string) => void, onFailure?: () => void) => void;
  write: (newClipText: unknown, onSuccess?: () => void, onFailure?: () => void) => void;
}

export function useClipboard(): ClipboardMethods {
  return useMemo(
    () => ({
      read: (onSuccess, onFailure) => {
        if (isBrowser) {
          try {
            navigator.clipboard
              .readText()
              .then((result) => onSuccess(result))
              .catch(onFailure);
          } catch {
            // eslint-disable-next-line no-console
            console.warn(
              'Cannot read text from the clipboard. navigator.clipboard.readText is not supported by your browser.'
            );
          }
        }
      },
      write: (newClipText, onSuccess, onFailure) => {
        if (isBrowser) {
          navigator.clipboard.writeText(String(newClipText)).then(onSuccess).catch(onFailure);
        }
      },
    }),
    []
  );
}
