import { useEffect } from 'react';

/**
 * Sets the favicon of the page.
 *
 * @param href source of the favicon
 */
export const useFavicon = (href: string): void => {
  useEffect(() => {
    const link: HTMLLinkElement =
      document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = href;
    if (link.parentElement === null) {
      document.head.append(link);
    }
  }, [href]);
};
