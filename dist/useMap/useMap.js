import { useRef } from 'react';
import { useRerender } from "../useRerender/useRerender.js";
const proto = Map.prototype;
/**
 * Tracks the state of a `Map`.
 *
 * @param entries Initial entries iterator for underlying `Map` constructor.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useMap(entries) {
    const mapRef = useRef();
    const rerender = useRerender();
    if (!mapRef.current) {
        const map = new Map(entries);
        mapRef.current = map;
        map.set = (...args) => {
            proto.set.apply(map, args);
            rerender();
            return map;
        };
        map.clear = (...args) => {
            proto.clear.apply(map, args);
            rerender();
        };
        map.delete = (...args) => {
            const res = proto.delete.apply(map, args);
            rerender();
            return res;
        };
    }
    return mapRef.current;
}
