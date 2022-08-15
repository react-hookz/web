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
  /**
   * Subscribe to window's `storage` event.
   */
  handleStorageEvent: boolean;
  /**
   * Isolate hook from others on page - it will not receive updates from other hooks with the same key.
   */
  isolated: boolean;
}

export const Example: React.FC<ExampleProps> = ({
  key = 'react-hookz-ss-test',
  defaultValue = '@react-hookz is awesome',
  handleStorageEvent = true,
  isolated = false,
}) => {
  const [value, setValue, removeValue] = useSessionStorageValue(key, defaultValue, {
    handleStorageEvent,
    isolated,
  });

  return (
    <div>
      <div>
        Below input value will persist between page reloads and even browser restart as its value is
        stored in SessionStorage.
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
