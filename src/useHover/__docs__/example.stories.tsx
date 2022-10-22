import * as React from 'react';
import { useHover } from '../..';

export const Example = () => {
  const element = (hovered: boolean) => <span>{hovered ? 'I’m hovered' : 'I’m not hovered'}</span>;
  const [hoverable, hovered] = useHover(element);

  return (
    <>
      {`The following element is${hovered ? '' : 'n’t'} hovered: `}
      {hoverable}
    </>
  );
};
