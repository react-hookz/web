import { useState } from 'react';
import { useEventListener } from '#root/useEventListener/index.js';
import { useMountEffect } from '#root/useMountEffect/index.js';
import { isBrowser } from '#root/util/const.js';

const isDocumentVisible = () => document.visibilityState === 'visible';

export function useDocumentVisibility(initializeWithValue: false): boolean | undefined;
export function useDocumentVisibility(initializeWithValue?: true): boolean;
/**
 * Returns a boolean indicating whether the document is visible or not.
 *
 * @param initializeWithValue Whether to initialize with the document visibility state or
 * `undefined`. _Set this to `false` during SSR._
 */
export function useDocumentVisibility(initializeWithValue = true): boolean | undefined {
	const [isVisible, setIsVisible] = useState(
		isBrowser && initializeWithValue ? isDocumentVisible() : undefined
	);

	useMountEffect(() => {
		if (!initializeWithValue) {
			setIsVisible(isDocumentVisible());
		}
	});

	useEventListener(isBrowser ? document : null, 'visibilitychange', () => {
		setIsVisible(isDocumentVisible());
	});

	return isVisible;
}
