import { useEffect, useState, type RefObject } from 'react';

export type Timeout = ReturnType<typeof setTimeout>;

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

		return () => {};
	}, [ref, time]);

	return scrolling;
}

export default useScrolling;
