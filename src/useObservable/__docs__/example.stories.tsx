import * as React from 'react';
import { useObservable } from '../..';

const mockConfig = {};

const useLayout = (effectCallback: React.EffectCallback) =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useLayoutEffect(effectCallback, []);

export const Example: React.FC = () => {
  const [domRectReadOnly, setdDOMRectReadOnly] = React.useState<DOMRectReadOnly | null>(null);
  const headingRef = React.useRef<HTMLHeadingElement>(null);

  const { observeElement } = useObservable(mockConfig, (entry) => {
    setdDOMRectReadOnly(entry.boundingClientRect);
  });

  useLayout(() => {
    if (headingRef.current) {
      observeElement(headingRef.current);
    }
  });

  return (
    <div>
      <h1 ref={headingRef}>Hello world</h1>
      <pre>{JSON.stringify(domRectReadOnly, undefined, 2)}</pre>
    </div>
  );
};
