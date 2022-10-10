import React from 'react';
import { useLocalStorageValue } from '../..';

interface ExampleProps {
  /**
   * Default value to return in case key not presented in LocalStorage.
   */
  defaultValue: string;
  /**
   * LocalStorage key to manage.
   */
  key: string;
}

export const Example: React.FC<ExampleProps> = ({
  key = 'react-hookz-ls-test',
  defaultValue = '@react-hookz is awesome',
}) => {
  const lsVal = useLocalStorageValue(key, {
    defaultValue,
    initializeWithValue: true,
  });

  return (
    <div>
      <div>
        Below input value will persist between page reloads and even browser restart as its value is
        stored in LocalStorage.
      </div>
      <br />
      <input
        type="text"
        value={lsVal.value}
        onChange={(ev) => {
          lsVal.set(ev.currentTarget.value);
        }}
      />{' '}
      <button onClick={lsVal.remove}>remove storage value</button>
    </div>
  );
};
