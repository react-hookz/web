/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useRef, useState } from 'react';
import { useMemoCache } from '../..';

const dependencyListMapper = {
  true: [1, 3],
  false: [2, 4],
};

const getSummary = (numbers: number[]) => numbers.reduce((a, b) => a + b);

const boolToString = (bool: boolean) => String(bool) as 'true' | 'false';

export const Example: React.FC = () => {
  const isTruthy = useRef(false);

  const [dependencyList, setDependencyList] = useState(
    () => dependencyListMapper[boolToString(isTruthy.current)]
  );

  const memoSpy = useRef(0);
  const memoCacheSpy = useRef(0);

  const memo = useMemo(() => {
    memoSpy.current++;

    return getSummary(dependencyList);
  }, dependencyList);

  const memoCache = useMemoCache(() => {
    memoCacheSpy.current++;

    return getSummary(dependencyList);
  }, dependencyList);

  const toggleDependencyList = () => {
    isTruthy.current = !isTruthy.current;

    setDependencyList(dependencyListMapper[boolToString(isTruthy.current)]);
  };

  return (
    <div>
      <section>
        <h1>Memo</h1>
        <p>summary: {memo}</p>
        <p>calls: {memoSpy.current}</p>
      </section>
      <section>
        <h1>Memo with cache</h1>
        <p>summary: {memoCache}</p>
        <p>calls: {memoCacheSpy.current}</p>
      </section>
      <button onClick={toggleDependencyList}>toggle dependency list</button>
    </div>
  );
};
