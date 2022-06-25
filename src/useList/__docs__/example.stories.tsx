import * as React from 'react';
import { useList } from '../..';

export const Example: React.FC = () => {
  const [
    list,
    {
      set,
      push,
      updateAt,
      insertAt,
      update,
      updateFirst,
      upsert,
      sort,
      filter,
      removeAt,
      clear,
      reset,
    },
  ] = useList([1, 2, 3, 4, 5]);

  return (
    <div>
      <button onClick={() => set([1, 2, 3])}>Set to [1, 2, 3]</button>
      <button onClick={() => push(0)}>Push 0 to the list</button>
      <button onClick={() => updateAt(1, 0)}>Update value at index 1 to 0</button>
      <br />
      <br />
      <button onClick={() => insertAt(2, 0)}>Insert value 0 to index 2</button>
      <button onClick={() => update((iteratedItem) => iteratedItem > 4, 0)}>
        Update all values that are greater than 4 to 0
      </button>
      <button onClick={() => updateFirst((iteratedItem) => iteratedItem > 3, 0)}>
        Update the first value that is greater than 3 to 0
      </button>
      <br />
      <br />
      <button onClick={() => upsert((iteratedItem) => iteratedItem > 5, 0)}>
        Upsert the first value that is greater than 5 to 0
      </button>
      <button onClick={() => filter((item: number) => item % 2 === 0)}>
        Filter out odd values
      </button>
      <button onClick={() => removeAt(2)}>Remove the element at index 2</button>
      <br />
      <br />
      <button onClick={() => sort((a: number, b: number) => a - b)}>Sort ascending</button>
      <button onClick={() => sort((a: number, b: number) => b - a)}>Sort descending</button>
      <br />
      <br />
      <button onClick={clear}>Clear</button>
      <button onClick={reset}>Reset</button>
      <pre>{JSON.stringify(list, null, 2)}</pre>
    </div>
  );
};
