import { useEffect, useRef } from 'react';
import { isBrowser } from '../util/const';
import { useUnmountEffect, useSyncedRef } from '..';

export interface IUseDocumentTitleOptions {
  /**
   * Function that processes title, useful to prefix or suffix the title.
   * @param title
   */
  wrapper: (title: string) => string;

  /**
   * Restore title that was before component mount on unmount.
   */
  restoreOnUnmount: boolean;
}

/**
 * Sets title of the page.
 *
 * @param title Title to set, if wrapper option is set, it will be passed through wrapper function.
 * @param options Options object.
 */
export function useDocumentTitle(
  title: string,
  options: Partial<IUseDocumentTitleOptions> = {}
): void {
  const titleRef = useRef(isBrowser ? document.title : '');
  const optionsRef = useSyncedRef(options);

  // it is safe not to check isBrowser here, as effects are not invoked in SSR
  useEffect(() => {
    document.title = options.wrapper ? options.wrapper(title) : title;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, options.wrapper]);

  useUnmountEffect(() => {
    if (optionsRef.current.restoreOnUnmount) {
      document.title = titleRef.current;
    }
  });
}
