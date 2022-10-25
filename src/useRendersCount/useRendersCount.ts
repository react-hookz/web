import { useRef } from 'react';

export function useRendersCount(): number {
  const rendersCount = useRef(0);
  rendersCount.current += 1;

  return rendersCount.current;
}
