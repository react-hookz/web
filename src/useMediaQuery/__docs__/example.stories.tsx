import * as React from 'react';
import { useMediaQuery } from '../..';

export const Example: React.FC = () => {
  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');
  const isMediumDevice = useMediaQuery(
    'only screen and (min-width : 769px) and (max-width : 992px)'
  );
  const isLargeDevice = useMediaQuery(
    'only screen and (min-width : 993px) and (max-width : 1200px)'
  );
  const isExtraLargeDevice = useMediaQuery('only screen and (min-width : 1201px)');

  return (
    <div>
      Resize your browser windows to see changes.
      <br />
      <br />
      <div>
        Small device (<code>max-width : 768px</code>):{' '}
        {isSmallDevice === undefined ? 'unknown' : isSmallDevice ? 'yes' : 'no'}
      </div>
      <div>
        Medium device (<code>max-width : 992px</code>):{' '}
        {isMediumDevice === undefined ? 'unknown' : isMediumDevice ? 'yes' : 'no'}
      </div>
      <div>
        Large device (<code>max-width : 1200px</code>):{' '}
        {isLargeDevice === undefined ? 'unknown' : isLargeDevice ? 'yes' : 'no'}
      </div>
      <div>
        Extra large device (<code>min-width : 1201px</code>):{' '}
        {isExtraLargeDevice === undefined ? 'unknown' : isExtraLargeDevice ? 'yes' : 'no'}
      </div>
    </div>
  );
};
