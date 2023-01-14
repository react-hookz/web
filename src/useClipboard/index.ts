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
        if (isBrowser && 'readText' in navigator.clipboard) {
          navigator.clipboard
            .readText()
            .then((result) => onSuccess(result))
            .catch(onFailure);
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
