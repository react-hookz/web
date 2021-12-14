import * as React from 'react';
import { useGetSet } from '../..';

export const Example: React.FC = () => {
  const [get, set] = useGetSet(0);
  const onClick = () => {
    setTimeout(() => {
      set(get() + 1);
    }, 1000);
  };
  return <button onClick={onClick}>Clicked: {get()}</button>;
};
