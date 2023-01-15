import * as React from 'react';
import { useEffect } from 'react';
import { useDocumentVisibility } from '../..';

export const Example: React.FC = () => {
  const isVisible = useDocumentVisibility();

  useEffect(() => {
    if (!isVisible) {
      // eslint-disable-next-line no-alert
      alert('Document was not visible');
    }
  }, [isVisible]);

  return (
    <div>
      <p>
        The document is <strong>{isVisible ? 'visible' : 'hidden'}</strong>
      </p>
    </div>
  );
};
