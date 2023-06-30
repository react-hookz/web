import React from 'react';
import { useSessionStorageValue } from '../..';

type ExampleProps = {
  /**
   * Default value to return in case key not presented in SessionStorage.
   */
  defaultValue: string;
  /**
   * SessionStorage key to manage.
   */
  key: string;
};

export function Example({
  key = 'react-hookz-ss-test',
  defaultValue = '@react-hookz is awesome',
}: ExampleProps) {
  const ssVal = useSessionStorageValue(key, { defaultValue });

  return (
    <div>
      <div>
        Below input value will persist between page reloads and even browser restart as its value is
        stored in SessionStorage.
      </div>
      <br />
      <input
        type="text"
        value={ssVal.value}
        onChange={(ev) => {
          ssVal.set(ev.currentTarget.value);
        }}
      />
      <button type="button" onClick={ssVal.remove}>
        remove storage value
      </button>
    </div>
  );
}
