import { useRef, useState } from '@storybook/addons';
import * as React from 'react';
import { useMemoCache } from '../..';

const getSummary = (state: Record<string, number>) => Object.values(state).reduce((a, b) => a + b);

export const Example: React.FC = () => {
  const [state, setState] = useState<Record<string, number>>({ dependency1: 0, dependency2: 0 });

  const memoSpy = useRef(0);
  const memoWithCacheSpy = useRef(0);

  const summary = useMemoCache(() => {
    memoSpy.current++;

    return getSummary(state);
  }, [state.dependency1, state.dependency2]);
  const summaryWithCache = useMemoCache(() => {
    memoWithCacheSpy.current++;

    return getSummary(state);
  }, [state.dependency1, state.dependency2]);

  const increase = (key: string) => {
    setState({ ...state, [key]: state[key] + 1 });
  };

  const decrease = (key: string) => {
    setState({ ...state, [key]: state[key] - 1 });
  };

  return (
    <div>
      <div>
        <p>
          summary: {summary}, calls: {memoSpy.current}
        </p>
        <p>
          summary with cache: {summaryWithCache}, calls: {memoWithCacheSpy.current}
        </p>
      </div>
      <ul>
        {Object.values(state).map((value, index) => {
          return (
            <li>
              <p>
                dependency {index + 1}: {value}
              </p>
            </li>
          );
        })}
      </ul>
      <div>
        {Object.keys(state).map((key, index) => (
          <>
            <button onClick={() => increase(key)}>increase dependency {index + 1}</button>
            <button onClick={() => decrease(key)}>decrease dependency {index + 1}</button>
          </>
        ))}
      </div>
    </div>
  );
};
