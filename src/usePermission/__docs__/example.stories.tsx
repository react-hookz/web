import * as React from 'react';
import { usePermission } from '../..';

export const Example: React.FC = () => {
  const status = usePermission({ name: 'notifications' });

  return (
    <div>
      <div>
        <em>
          We do not use any notifications, notifications permission requested only for presentation
          purposes.
        </em>
      </div>
      <br />
      <div>
        Notifications status: <code>{status}</code>
      </div>
      <div>
        {status === 'prompt' && (
          <button
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              Notification.requestPermission();
            }}>
            Request notifications permission
          </button>
        )}
      </div>
    </div>
  );
};
