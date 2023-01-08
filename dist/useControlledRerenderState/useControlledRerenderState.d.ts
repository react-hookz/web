import { SetStateAction } from 'react';
export type ControlledRerenderDispatch<A> = (value: A, rerender?: boolean) => void;
export declare function useControlledRerenderState<S>(initialState: S | (() => S)): [S, ControlledRerenderDispatch<SetStateAction<S>>];
export declare function useControlledRerenderState<S = undefined>(): [
    S | undefined,
    ControlledRerenderDispatch<SetStateAction<S | undefined>>
];
