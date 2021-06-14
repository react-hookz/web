import * as React from 'react';
import { useCookieValue } from '../..';

export const Example: React.FC = () => {
  const [cookie, set, remove] = useCookieValue('react-hookz', { expires: 3600 });

  return (
    <div>
      <div>
        <em>Cookie name:</em> react-hookz
      </div>
      <div>
        <em>Cookie value:</em> {cookie}
      </div>
      <br />
      <input
        type="text"
        value={cookie ?? ''}
        onChange={(ev) => {
          set(ev.target.value);
        }}
        placeholder="Enter cookie value here"
      />
      <br />
      <br />
      <div>
        <button onClick={remove}>remove cookie</button>
      </div>
    </div>
  );
};
