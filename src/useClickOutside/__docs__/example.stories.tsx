import * as React from 'react';
import { useRef } from 'react';
import { useClickOutside } from '../useClickOutside';
import { useToggle } from '../../useToggle/useToggle';

export const Example: React.FC = () => {
  const [toggled, toggle] = useToggle();

  const ToggledComponent = () => {
    const ref = useRef(null);

    useClickOutside(ref, () => {
      // eslint-disable-next-line no-alert
      window.alert('told ya!');
      toggle();
    });

    return (
      <div
        ref={ref}
        style={{
          background: 'maroon',
          width: 200,
          height: 200,
          cursor: 'pointer',
          padding: 16,
          fontWeight: 'bold',
          color: 'rgba(255, 255, 255, .95)',
          fontFamily: 'sans-serif',
        }}>
        DO NOT
        <br />
        CLICK OUTSIDE
        <br />
        THE RED SQUARE!
      </div>
    );
  };

  return (
    <div>
      <div>Let&apos;s try some reverse psychology =)</div>
      <br />

      {!toggled && <button onClick={() => toggle()}>Let&apos;s try!</button>}
      {toggled && <ToggledComponent />}
    </div>
  );
};
