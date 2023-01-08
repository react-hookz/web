import { DependencyList } from 'react';
/**
 * Like `React.useEffect`, but state is only updated within animation frame.
 *
 * @param callback Callback like for `useEffect`, but without ability to return
 * a cleanup function.
 * @param deps Dependencies list that will be passed to underlying `useEffect`.
 */
export declare function useRafEffect(callback: (...args: any[]) => void, deps: DependencyList): void;
