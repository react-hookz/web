import { cloneElement, DOMAttributes, MouseEvent, ReactElement, useState } from 'react';

export type HoverableElement<T extends ReactElement> = ((state: boolean) => T) | T;

/**
 * React UI sensor hooks thats track if an element is being hovered by a mouse.
 * Sets `onMouseEnter` and `onMouseLeave` events.
 *
 * @example
 * ```tsx
 * import { useHover } from '@react-hookz/web'
 *
 * const Example = () => {
 *   const element = (hovered) => (
 *     <>
 *       {hovered ? 'I’m hovered' : 'I’m not hovered'}
 *     </>
 *   )
 *   const [hoverable, hovered] = useHover(element)
 *
 *   return (
 *     <>
 *       {`The element is${hovered ? '' : 'n’t'} hovered: `}
 *       {hoverable}
 *     </>
 *   )
 * }
 * ```
 *
 * @param element a React element, or a function that returns one
 * @returns a tuple containing the hoverable element and a boolean indicating whether the element is hovered.
 */
export const useHover = <T extends ReactElement<DOMAttributes<T>>>(
  element: HoverableElement<T>
): [ReactElement<DOMAttributes<T>>, boolean] => {
  const [state, setState] = useState(false);

  const onMouseEnter =
    (originalOnMouseEnter?: DOMAttributes<T>['onMouseEnter']) => (event: MouseEvent<T>) => {
      originalOnMouseEnter?.(event);
      setState(true);
    };
  const onMouseLeave =
    (originalOnMouseLeave?: DOMAttributes<T>['onMouseLeave']) => (event: MouseEvent<T>) => {
      originalOnMouseLeave?.(event);
      setState(false);
    };

  if (typeof element === 'function') {
    element = element(state);
  }

  const el = cloneElement(element, {
    onMouseEnter: onMouseEnter(element.props.onMouseEnter),
    onMouseLeave: onMouseLeave(element.props.onMouseLeave),
  });

  return [el, state];
};
