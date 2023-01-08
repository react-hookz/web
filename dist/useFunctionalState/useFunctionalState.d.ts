import { Dispatch, SetStateAction } from 'react';
export declare function useFunctionalState<S>(initialState: S | (() => S)): [() => S, Dispatch<SetStateAction<S>>];
export declare function useFunctionalState<S = undefined>(): [
    () => S | undefined,
    Dispatch<SetStateAction<S | undefined>>
];
