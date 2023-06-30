import { type DependencyList, useEffect, useRef } from 'react';

/**
 * This hook provides a console log when the component mounts, updates and unmounts.
 *
 * @param componentName Provides the name of the component in which the life cycle is being logged
 * @param deps Dependencies list, as for `useEffect` hook
 */
export function useLifecycleLogger(componentName: string, deps?: DependencyList): void {
	const mountedRef = useRef(false);

	useEffect(() => {
		if (mountedRef.current) {
			console.log(`${componentName} updated`, deps && [...deps]);
		}
	}, deps);

	useEffect(() => {
		mountedRef.current = true;
		console.log(`${componentName} mounted`, deps && [...deps]);

		return () => {
			mountedRef.current = false;
			console.log(`${componentName} unmounted`);
		};
	}, []);
}
