import { Dispatch, SetStateAction } from 'react';
export declare function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>];
export declare function useSafeState<S = undefined>(): [
    S | undefined,
    Dispatch<SetStateAction<S | undefined>>
];
