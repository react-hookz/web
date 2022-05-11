/* eslint-disable no-console */
import { DependencyList } from 'react';
import { useUpdateEffect, useMountEffect } from '..';

/**
 * This hook provides a console log when the component mounts, updates and unmounts.
 *
 * @param componentName Provides the name of the component in which the life cycle is being logged
 * @param deps Dependencies list, as for `useEffect` hook
 */
export function useLifecycleLogger(componentName: string, deps?: DependencyList): void {
  useMountEffect(() => {
    console.log(`${componentName} mounted`, { ...deps });
    return () => console.log(`${componentName} unmounted`);
  });

  useUpdateEffect(() => {
    console.log(`${componentName} updated`, { ...deps });
  }, deps);
}
