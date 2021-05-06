import React from 'react';
import { useSessionStorageValue } from '../../src';

interface IExampleProps {
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
}

export const Example: React.FC<IExampleProps> = ({
  key = 'react-hookz-ls-test',
  defaultValue = '@react-hookz is awesome',
  handleStorageEvent = true,
}) => {
  const [value, setValue, removeValue] = useSessionStorageValue(key, defaultValue, {
    handleStorageEvent,
  });

  return (
    <div>
      <div>
        Below input value will persist between page reloads and even browser restart as it`s value
        is stored in SessionStorage.
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
