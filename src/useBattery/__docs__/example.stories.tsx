import * as React from 'react';
import { useBattery } from '../..';

const displayJSON = (object: Record<PropertyKey, unknown>) => JSON.stringify(object, undefined, 2);

export const Example: React.FC = () => {
  const battery = useBattery();

  return <pre>{displayJSON(battery)}</pre>;
};
