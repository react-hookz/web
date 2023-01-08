import { Dispatch, SetStateAction } from 'react';
export declare function useRafState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
export declare function useRafState<S = undefined>(): [
    S | undefined,
    Dispatch<SetStateAction<S | undefined>>
];
