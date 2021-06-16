import * as React from 'react';
import { useState } from 'react';
import { IValidatorDeferred, useDebouncedCallback, useValidator } from '../..';

export const ExampleStories: React.FC = () => {
  const [text, setText] = useState('');

  // as deferred validator is unable to infer the type of validity
  // state - we should define it ourself
  type ITextValidityState = { isValid: boolean | undefined; error: Error | undefined };

  // debounced callback is deferred callback so we should use deferred type
  // of validator (the one that receives dispatcher as an argument)
  const validator = useDebouncedCallback<IValidatorDeferred<ITextValidityState>>(
    (d) => {
      const isValid = !text.length || text.length % 2 === 1;

      d({
        isValid,
        error: !isValid ? new Error('text length should be an odd length') : undefined,
      });
    },
    150,
    [text]
  );

  // validity state type if inferred from validator
  const [validity] = useValidator(validator, [validator]);

  return (
    <div>
      <div>The input below is only valid if it has an odd number of characters</div>
      <br />

      {validity.isValid === false && <div style={{ color: 'red' }}>{validity.error?.message}</div>}
      <input
        type="text"
        value={text}
        onChange={(ev) => {
          setText(ev.target.value);
        }}
      />
    </div>
  );
};
