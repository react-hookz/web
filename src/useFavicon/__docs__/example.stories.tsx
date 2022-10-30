import * as React from 'react';
import { useFavicon } from '../..';

export const Example: React.FC = () => {
  useFavicon('https://cdn.sstatic.net/Sites/stackoverflow/img/favicon.ico');

  return (
    <div>
      This example is rendered in an iframe, which means this hook cannot change the favicon of this
      page. However, below you see an example usage of this hook.
    </div>
  );
};
