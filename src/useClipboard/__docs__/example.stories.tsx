import * as React from 'react';
import { useState } from 'react';
import { useClipboard } from '../..';

export const Example: React.FC = () => {
  const { read, write } = useClipboard();
  const [textToBeCopied, setTextToBeCopied] = useState('');
  const [clipboardContent, setClipboardContent] = useState('');

  return (
    <main>
      <p>Write to clipboard</p>
      <div style={{ display: 'flex', marginBottom: '1rem', gap: '0.5rem' }}>
        <input
          name="text to be copied"
          value={textToBeCopied}
          onChange={(event) => setTextToBeCopied(event.target.value)}
        />
        <button type="submit" onClick={() => write(textToBeCopied)}>
          Copy to clipboard
        </button>
      </div>
      <p>Read from clipboard</p>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button type="submit" onClick={() => read(setClipboardContent)}>
          Read clipboard content
        </button>
        <code style={{ border: '1px solid black', width: '10%' }}>{clipboardContent}</code>
      </div>
    </main>
  );
};
