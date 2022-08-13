import { useMemo, useCallback } from 'react';

import { createObservers } from './utils';
import { useUnmountEffect } from '..';
import { isBrowser, noop } from '../util/const';
import { ObserverCallback } from './types';

const { observe } = createObservers();

const useObservableMock = () => ({ observeElement: noop, cleanup: noop });

/**
 * Provides a way to asynchronously observe changes in the intersection of a target
 * element with an ancestor element or with a top-level document's viewport.
 *
 * @param observerInit configuration of IntersectionObserver
 * @param observerCallback callback of IntersectionObserver
 * @returns
 */
export const useObservableImpl = (
  observerInit: IntersectionObserverInit,
  observerCallback: ObserverCallback
) => {
  const subscribers = useMemo<Map<Element, ReturnType<typeof observe>>>(() => new Map(), []);

  const cleanup = useCallback(() => {
    subscribers.forEach((subscriber) => subscriber.unobserve());
    subscribers.clear();
  }, [subscribers]);

  const observeElement = useCallback(
    (element: Element) => {
      if (subscribers.has(element)) {
        subscribers.get(element)?.unobserve();
      }
      const subscriber = observe(element, observerCallback, observerInit);

      subscribers.set(element, subscriber);
    },
    [observerCallback, observerInit, subscribers]
  );

  useUnmountEffect(cleanup);

  return { observeElement, cleanup };
};

export const useObservable = isBrowser ? useObservableImpl : useObservableMock;
