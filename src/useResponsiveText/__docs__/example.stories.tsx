import * as React from 'react';
import { useResponsiveText } from '../..';

export const Example: React.FC = () => {
  const [headingRef] = useResponsiveText<HTMLHeadingElement>(10);

  return (
    <div>
      <p>Resize the window to change it&apos;s size.</p>
      <h1 ref={headingRef}>Responsive!</h1>
    </div>
  );
};
