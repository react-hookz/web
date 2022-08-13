import { ObserverCallback, Observer } from './types';

const createObserver = (observerInit: IntersectionObserverInit) => {
  const subscribers = new Map<Element, ObserverCallback>();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const callback = subscribers.get(entry.target);

      if (callback) {
        callback(entry);
      }
    });
  }, observerInit);

  const subscribe = (element: Element, observerCallback: ObserverCallback) => {
    observer.observe(element);
    subscribers.set(element, observerCallback);

    const unsubscribe = () => {
      observer.unobserve(element);
      subscribers.delete(element);

      if (subscribers.size === 0) {
        observer.disconnect();
      }
    };

    return unsubscribe;
  };

  return {
    subscribe,
  };
};

export const createObservers = () => {
  const observers = new Map<IntersectionObserverInit, Observer>();

  const getObserver = (observerInit: IntersectionObserverInit) => {
    if (observers.has(observerInit)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return observers.get(observerInit)!;
    }

    const observer = createObserver(observerInit);

    return observer;
  };

  const observe = (
    element: Element,
    observerCallback: ObserverCallback,
    observerInit: IntersectionObserverInit
  ) => {
    const observer = getObserver(observerInit);
    const unobserve = observer.subscribe(element, observerCallback);

    return {
      unobserve,
    };
  };

  return { observe };
};
