/* eslint-disable no-console */
import { useEffect, useRef } from 'react';
/**
 * This hook provides a console log when the component mounts, updates and unmounts.
 *
 * @param componentName Provides the name of the component in which the life cycle is being logged
 * @param deps Dependencies list, as for `useEffect` hook
 */
export function useLifecycleLogger(componentName, deps) {
    const mountedRef = useRef(false);
    useEffect(() => {
        if (mountedRef.current) {
            console.log(`${componentName} updated`, deps && [...deps]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
    useEffect(() => {
        mountedRef.current = true;
        console.log(`${componentName} mounted`, deps && [...deps]);
        return () => {
            mountedRef.current = false;
            console.log(`${componentName} unmounted`);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
