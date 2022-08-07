import React, { useReducer, useMemo, useRef } from 'react';
import { useRetain } from '../useRetain';

// data
const keys = ['firstname', 'name'];

// utils
const getRandom = <TArray extends unknown[]>(array: TArray) =>
  array[Math.floor(Math.random() * array.length)] as TArray[number];
const displayAsJSON = <TObject extends Record<string, string>>(object: TObject) =>
  JSON.stringify(object, undefined, 2);
const reverse = (object: Record<string, string>) =>
  Object.fromEntries(Object.entries(object).map(([key, value]) => [value, key]));

// hooks
const useForce = () => useReducer((state) => !state, false)[1];

export const Example: React.FC = () => {
  const force = useForce();

  const reversedPerson = useRef<Record<string, string> | null>(null);

  const memoCalls = useRef(0);
  const retainCalls = useRef(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const person = { key: getRandom(keys), value: 'John' };

  useRetain(
    () => {
      if (person) {
        retainCalls.current++;

        reversedPerson.current = reverse(person);
      }
    },
    [person] as const,
    (savedDeps, deps) => {
      const savedDependency = savedDeps[0];
      const dependency = deps[0];

      return savedDependency.key !== dependency.key;
    }
  );

  useMemo(() => {
    if (person) {
      memoCalls.current++;
    }
  }, [person]);

  return (
    <div>
      {person && displayAsJSON(person)}
      <p>memo calls: {memoCalls.current}</p>
      <p>retain calls: {retainCalls.current}</p>
      <button onClick={force}>force</button>
    </div>
  );
};
