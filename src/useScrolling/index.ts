import { useEffect, useState, type RefObject } from 'react';

type Timeout = ReturnType<typeof setTimeout>;

/**
 * Listen to whether a dom element is scrolling
 * @param ref RefObject
 * @param time debonce time
 * @returns isScolling: boolean
 */
export function useScrolling(ref: RefObject<HTMLElement>, time = 150): boolean {
	const [scrolling, setScrolling] = useState(false);

	useEffect(() => {
		if (ref.current) {
			let timeout: Timeout;

			const handleScroll = () => {
				setScrolling(true);
				clearTimeout(timeout);
				timeout = setTimeout(() => {
					setScrolling(false);
				}, time);
			};

			ref.current.addEventListener('scroll', handleScroll);
			return () => {
				if (ref.current) {
					ref.current.removeEventListener('scroll', handleScroll);
				}
			};
		}
	}, [ref, time]);

	return scrolling;
}
