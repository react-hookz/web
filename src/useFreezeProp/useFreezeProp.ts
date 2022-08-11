import { useMemo, useRef } from 'react';

/**
 * @param prop for freeze
 * @returns freezed prop
 */
export const useFreezeProp = <Prop>(prop: Prop) => {
  const freezeProp = useRef(prop);

  return useMemo(
    () =>
      Object.freeze({
        get current() {
          return freezeProp.current;
        },
      }),
    []
  );
};
