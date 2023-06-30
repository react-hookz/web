import * as React from 'react';
import { useState } from 'react';
import { useHookableRef } from '../..';

export function Example() {
  const [get, setGet] = useState<Date>();
  const [set, setSet] = useState<Date>();

  const ref = useHookableRef(
    123,
    (v) => {
      setSet(new Date());
      return v;
    },
    (v) => {
      setGet(new Date());
      return v;
    }
  );

  return (
    <div>
      <div>Ref value read: {get?.toString()}</div>
      <div>Ref value assign: {set?.toString()}</div>

      <div>
        <button
          type="button"
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            ref.current;
          }}>
          Read ref
        </button>
        <button
          type="button"
          onClick={() => {
            ref.current = 321;
          }}>
          Assign ref
        </button>
      </div>
    </div>
  );
}
