import { useState } from 'react';
import { useIsomorphicLayoutEffect } from '..';

/**
 *
 * @param ms milliseconds for how long to keep rendering component
 * @param delay delay in milliseconds after which to start re-rendering component
 * @returns number
 */
export function useRaf(ms = 1e12, delay = 0): number {
  const [elapsed, setElapsed] = useState<number>(0);

  useIsomorphicLayoutEffect(() => {
    let frame: number;
    let stop: NodeJS.Timeout;
    let start: number;

    const onFrame = () => {
      const time = Math.min(1, (Date.now() - start) / ms);
      setElapsed(time);
      loop();
    };

    function loop() {
      frame = requestAnimationFrame(onFrame);
    }

    const onStart = () => {
      stop = setTimeout(() => {
        cancelAnimationFrame(frame);
        setElapsed(1);
      }, ms);
      start = Date.now();
      loop();
    };
    const timerDelay = setTimeout(onStart, delay);

    return () => {
      clearTimeout(stop);
      clearTimeout(timerDelay);
      cancelAnimationFrame(frame);
    };
  }, [ms, delay]);

  return elapsed;
}
