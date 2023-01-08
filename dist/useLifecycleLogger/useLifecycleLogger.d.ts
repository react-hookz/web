import { DependencyList } from 'react';
/**
 * This hook provides a console log when the component mounts, updates and unmounts.
 *
 * @param componentName Provides the name of the component in which the life cycle is being logged
 * @param deps Dependencies list, as for `useEffect` hook
 */
export declare function useLifecycleLogger(componentName: string, deps?: DependencyList): void;
