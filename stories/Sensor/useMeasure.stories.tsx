import * as React from 'react';
import { useMeasure } from '../../src/useMeasure';

export const Example: React.FC = () => {
  const [measurements, ref] = useMeasure<HTMLDivElement>();

  return (
    <div>
      <pre>{JSON.stringify(measurements)}</pre>
      <div
        ref={ref}
        style={{
          minWidth: 100,
          minHeight: 100,
          resize: 'both',
          overflow: 'auto',
          background: 'red',
        }}>
        resize me UwU
      </div>
    </div>
  );
};
