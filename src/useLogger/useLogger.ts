import { DependencyList } from 'react';
import { useUpdateEffect, useMountEffect } from '..';

export function useLogger(componentName: string, deps?: DependencyList, ...rest: any): void {
  useMountEffect(() => {
    console.log(`${componentName} mounted`, { ...rest });
    return () => console.log(`${componentName} unmounted`);
  });

  useUpdateEffect(() => {
    console.log(`${componentName} updated`, { ...rest });
  }, deps);
}
