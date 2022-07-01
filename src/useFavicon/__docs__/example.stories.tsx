import * as React from 'react';
import { useFavicon, useToggle } from '../..';

export const Example: React.FC = () => {
  const [mounted, toggleMounted] = useToggle(false);

  const ChildComponent: React.FC = () => {
    useFavicon('https://cdn.sstatic.net/Sites/stackoverflow/img/favicon.ico');

    return <div>Child component is mounted</div>;
  };

  return (
    <div>
      When child component is mounted, the document&apos;s favicon will change <br />
      <button onClick={() => toggleMounted()}>{mounted ? 'Unmount' : 'Mount'} component</button>
      {mounted && <ChildComponent />}
    </div>
  );
};
