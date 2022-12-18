import * as React from 'react';
import { useEffect } from 'react';
import { useWindowVisibility } from '../..';

export const Example: React.FC = () => {
  const isVisible = useWindowVisibility();

  useEffect(() => {
    if (!isVisible) {
      // eslint-disable-next-line no-alert
      alert('Window was not visible');
    }
  }, [isVisible]);

  return (
    <div>
      <p>
        Window is <strong>{isVisible ? 'visible' : 'hidden'}</strong>
      </p>
    </div>
  );
};
