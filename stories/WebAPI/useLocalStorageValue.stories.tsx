import React from 'react';
import { useLocalStorageValue } from '../../src/useLocalStorageValue';

interface IExampleProps {
  /**
   * Default value to return in case key not presented in LocalStorage
   */
  defaultValue: string;
  /**
   * LocalStorage key to manage
   */
  key: string;
  /**
   * Synchronize values between tabs.
   */
  syncTabs: boolean;
}

export const Example: React.FC<IExampleProps> = ({
  key = 'react-hookz-ls-test',
  defaultValue = '@react-hookz is awesome',
  syncTabs = true,
}) => {
  const [value, setValue, removeValue] = useLocalStorageValue(key, defaultValue, { syncTabs });

  return (
    <div>
      <div>
        Below input value will persist between page reloads and even browser restart as it`s value
        is stored in LocalStorage.
      </div>
      <br />
      <input
        type="text"
        value={value}
        onChange={(ev) => {
          setValue(ev.currentTarget.value);
        }}
      />{' '}
      <button onClick={removeValue}>clear storage value</button>
    </div>
  );
};
