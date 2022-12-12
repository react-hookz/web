import * as React from 'react';
import { useState, useEffect } from 'react';
import { usePromise } from '../..';

export const Example: React.FC = () => {
  const mounted = usePromise();
  const [value, setValue] = useState<string>();

  const myPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve('foo');
    }, 300);
  });

  useEffect(() => {
    (async () => {
      const res = await mounted(myPromise);

      if (typeof res === 'string') {
        // This line will not execute if this component gets unmounted.
        setValue(res);
      }
    })();
  });

  return (
    <div>
      <button>{value}</button>
    </div>
  );
};
