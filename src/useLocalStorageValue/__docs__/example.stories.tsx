import React from 'react';
import { useLocalStorageValue } from '../..';

interface IExampleProps {
  /**
   * Default value to return in case key not presented in LocalStorage.
   */
  defaultValue: string;
  /**
   * LocalStorage key to manage.
   */
  key: string;
  /**
   * Subscribe to window's `storage` event.
   */
  handleStorageEvent: boolean;
  /**
   * Isolate hook from others on page - it will not receive updates from other hooks managing same key.
   */
  isolated: boolean;
}

export const Example: React.FC<IExampleProps> = ({
  key = 'react-hookz-ls-test',
  defaultValue = '@react-hookz is awesome',
  handleStorageEvent = true,
  isolated = false,
}) => {
  const [value, setValue, removeValue] = useLocalStorageValue(key, defaultValue, {
    handleStorageEvent,
    isolated,
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
        value={value}
        onChange={(ev) => {
          setValue(ev.currentTarget.value);
        }}
      />{' '}
      <button onClick={removeValue}>clear storage value</button>
    </div>
  );
};
