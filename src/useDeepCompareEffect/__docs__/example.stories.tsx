import * as React from 'react';
import { useDeepCompareEffect } from '../..';

export const Example: React.FC = () => {
  useDeepCompareEffect(() => {}, []);

  return <div>Im unable to imagine worthy example 😭😭</div>;
};
