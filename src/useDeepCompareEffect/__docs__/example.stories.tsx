import * as React from 'react';
import { useDeepCompareEffect } from '../..';

export const Example: React.FC = () => {
  useDeepCompareEffect(() => {}, []);

  return (
    <div>
      <p>
        We don&apos;t have an example for useDeepCompareEffect yet. Want to{' '}
        <a href="https://github.com/react-hookz/web/issues/582">contribute one</a>?
      </p>
    </div>
  );
};
