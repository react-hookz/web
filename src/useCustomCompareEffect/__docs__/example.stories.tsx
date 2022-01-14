import * as React from 'react';
import { useCustomCompareEffect } from '../..';

export const Example: React.FC = () => {
  useCustomCompareEffect(() => {}, []);

  return (
    <div>
      <p>
        We don&apos;t have an example for useCustomCompareEffect yet. Want to{' '}
        <a href="https://github.com/react-hookz/web/issues/352">contribute one</a>?
      </p>
    </div>
  );
};
