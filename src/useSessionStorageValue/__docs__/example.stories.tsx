import React from 'react';
import { useSessionStorageValue } from '../..';

interface ExampleProps {
  /**
   * Default value to return in case key not presented in SessionStorage.
   */
  defaultValue: string;
  /**
   * SessionStorage key to manage.
   */
  key: string;
}

export const Example: React.FC<ExampleProps> = ({
  key = 'react-hookz-ss-test',
  defaultValue = '@react-hookz is awesome',
}) => {
  const ssVal = useSessionStorageValue(key, { defaultValue, initializeWithValue: true });

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
      />{' '}
      <button onClick={ssVal.remove}>remove storage value</button>
    </div>
  );
};
