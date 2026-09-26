import {useRef} from 'react';
import {useRerender} from '../useRerender/index.js';

const proto = Map.prototype;

/**
 * Tracks the state of a `Map`.
 *
 * `set` rerenders when adding a key or changing its value (compared with `Object.is`).
 * Replace object values rather than mutating and setting the same reference.
 *
 * @param entries Initial entries iterator for underlying `Map` constructor.
 */

export function useMap<K = any, V = any>(entries?: ReadonlyArray<readonly [K, V]> | null): Map<K, V> {
	const mapRef = useRef<Map<K, V>>(undefined);
	const rerender = useRerender();

	if (!mapRef.current) {
		const map = new Map<K, V>(entries);

		mapRef.current = map;

		map.set = (...args) => {
			const [key, value] = args;
			const changed = !map.has(key) || !Object.is(map.get(key), value);
			proto.set.apply(map, args);
			if (changed) {
				rerender();
			}
			return map;
		};

		map.clear = (...args) => {
			proto.clear.apply(map, args);
			rerender();
		};

		map.delete = (...args) => {
			const existed = proto.delete.apply(map, args);
			rerender();

			return existed;
		};
	}

	return mapRef.current;
}
