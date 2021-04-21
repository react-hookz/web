import { Meta } from '@storybook/react';
import * as React from 'react';
import { useState } from 'react';
import { useUpdateEffect } from '../src';

export const HookExample = () => {
  const [state, setState] = useState<Date>();

  useUpdateEffect(() => {
    setState(new Date());
  });

  return (
    <div>
      <div>{state}</div>
      <button>Press to update component</button>
    </div>
  );
};

export default {
  title: 'Lifecycle/useUpdateEffect',
  component: HookExample,
} as Meta;
