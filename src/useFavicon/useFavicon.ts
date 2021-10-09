import { useEffect } from 'react';

/**
 * Sets the favicon of the page.
 *
 * @param href favicon source string to set.
 */
export const useFavicon = (href: string): void => {
  useEffect(() => {
    const link: HTMLLinkElement =
      document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = href;
    document.getElementsByTagName('head')[0].appendChild(link);
  }, [href]);
};
