import * as React from 'react';
import { useHookableRef, useSafeState } from '../..';

export const Example: React.FC = () => {
  const [get, setGet] = useSafeState<Date>();
  const [set, setSet] = useSafeState<Date>();

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
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            ref.current;
          }}>
          Read ref
        </button>
        <button
          onClick={() => {
            ref.current = 321;
          }}>
          Assign ref
        </button>
      </div>
    </div>
  );
};
