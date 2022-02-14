import { useUpdateEffect, useMountEffect } from '..';

export function useLogger(componentName: string, ...rest: any): void {
  useMountEffect(() => {
    console.log(`${componentName} mounted`, { ...rest });
    return () => console.log(`${componentName} unmounted`);
  });

  useUpdateEffect(() => {
    console.log(`${componentName} updated`, { ...rest });
  });
}
