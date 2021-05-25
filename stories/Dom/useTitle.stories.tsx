import React from 'react';
import { useTitle, useToggle } from '../../src';

export const Example: React.FC = () => {
  const [mounted, toggleMounted] = useToggle(false);

  const titleWrapper = (title: string) => `@react-hookz/web is ${title}`;

  const ChildComponent: React.FC = () => {
    useTitle('awesome!', {
      wrapper: titleWrapper,
      restoreOnUnmount: true,
    });

    return <div>Child component is mounted</div>;
  };

  return (
    <div>
      While child component is mounted, document will have custom title and it will be reset to
      default when component is unmounted. <br />
      <button onClick={() => toggleMounted()}>{mounted ? 'Unmount' : 'Mount'} component</button>
      {mounted && <ChildComponent />}
    </div>
  );
};
