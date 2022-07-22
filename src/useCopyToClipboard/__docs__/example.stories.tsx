import * as React from 'react';
import { useState } from 'react';
import { useCopyToClipboard } from '../useCopyToClipboard';

export const Example: React.FC = () => {
  const [value, setValue] = useState('');

  const [copyState, copyToClipboard, resetCopyState] = useCopyToClipboard();

  return (
    <div>
      <div style={{ marginBottom: '1em' }}>
        <label htmlFor="value-to-copy">
          <div>Enter value to copy</div>
          <input id="value-to-copy" value={value} onChange={(e) => setValue(e.target.value)} />
        </label>
      </div>
      <div style={{ marginBottom: '0.5em' }}>
        <button disabled={value.length === 0} onClick={() => copyToClipboard(value)}>
          Copy to clipboard
        </button>
        <button onClick={() => copyToClipboard(1234 as unknown as string)}>
          Copy invalid data to clipboard (error)
        </button>
        <button onClick={resetCopyState}>Reset copy state</button>
      </div>
      <div style={{ marginBottom: '1em' }}>
        <pre>
          <code>
            {JSON.stringify({
              ...copyState,
              error: copyState.error ? { message: copyState.error.message } : undefined,
            })}
          </code>
        </pre>
      </div>
      {copyState.success ? (
        <div style={{ color: 'green' }}>Successfully copied to clipboard</div>
      ) : copyState.success === false ? (
        <div style={{ color: 'red' }}>
          Failed to copy to clipboard: {copyState.error?.message ?? 'No error set'}
        </div>
      ) : (
        <div>Not copied to clipboard yet</div>
      )}
    </div>
  );
};
