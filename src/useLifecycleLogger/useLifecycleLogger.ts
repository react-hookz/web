import { DependencyList } from 'react';
import { useUpdateEffect, useMountEffect } from '..';

export function useLifecycleLogger(componentName: string, deps?: DependencyList): void {
  useMountEffect(() => {
    console.log(`${componentName} mounted`, { ...deps });
    return () => console.log(`${componentName} unmounted`);
  });

  useUpdateEffect(() => {
    console.log(`${componentName} updated`, { ...deps });
  }, deps);
}
