import { useEffect } from 'react';
import { useSafeState } from "../useSafeState/useSafeState.js";
const DEFAULT_THRESHOLD = [0];
const DEFAULT_ROOT_MARGIN = '0px';
const observers = new Map();
const getObserverEntry = (options) => {
    const root = options.root ?? document;
    let rootObservers = observers.get(root);
    if (!rootObservers) {
        rootObservers = new Map();
        observers.set(root, rootObservers);
    }
    const opt = JSON.stringify([options.rootMargin, options.threshold]);
    let entry = rootObservers.get(opt);
    if (!entry) {
        const callbacks = new Map();
        const observer = new IntersectionObserver((entries) => entries.forEach((e) => callbacks.get(e.target)?.forEach((cb) => setTimeout(() => cb(e), 0))), options);
        entry = {
            observer,
            observe(target, callback) {
                let cbs = callbacks.get(target);
                if (!cbs) {
                    // if target has no observers yet - register it
                    cbs = new Set();
                    callbacks.set(target, cbs);
                    observer.observe(target);
                }
                // as Set is duplicate-safe - simply add callback on each call
                cbs.add(callback);
            },
            unobserve(target, callback) {
                const cbs = callbacks.get(target);
                // else branch should never occur in case of normal execution
                // because callbacks map is hidden in closure - it is impossible to
                // simulate situation with non-existent `cbs` Set
                /* istanbul ignore else */
                if (cbs) {
                    // remove current observer
                    cbs.delete(callback);
                    if (!cbs.size) {
                        // if no observers left unregister target completely
                        callbacks.delete(target);
                        observer.unobserve(target);
                        // if not tracked elements left - disconnect observer
                        if (!callbacks.size) {
                            observer.disconnect();
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            rootObservers.delete(opt);
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            if (!rootObservers.size) {
                                observers.delete(root);
                            }
                        }
                    }
                }
            },
        };
        rootObservers.set(opt, entry);
    }
    return entry;
};
/**
 * Tracks intersection of a target element with an ancestor element or with a
 * top-level document's viewport.
 *
 * @param target React reference or Element to track.
 * @param options Like `IntersectionObserver` options but `root` can also be
 * react reference
 */
export function useIntersectionObserver(target, { threshold = DEFAULT_THRESHOLD, root: r, rootMargin = DEFAULT_ROOT_MARGIN, } = {}) {
    const [state, setState] = useSafeState();
    useEffect(() => {
        const tgt = target && 'current' in target ? target.current : target;
        if (!tgt)
            return;
        let subscribed = true;
        const observerEntry = getObserverEntry({
            root: r && 'current' in r ? r.current : r,
            rootMargin,
            threshold,
        });
        const handler = (entry) => {
            // it is reinsurance for the highly asynchronous invocations, almost
            // impossible to achieve in tests, thus excluding from LOC
            /* istanbul ignore else */
            if (subscribed) {
                setState(entry);
            }
        };
        observerEntry.observe(tgt, handler);
        return () => {
            subscribed = false;
            observerEntry.unobserve(tgt, handler);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [target, r, rootMargin, ...threshold]);
    return state;
}
