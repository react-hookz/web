import { BaseSyntheticEvent } from 'react';
import { InitialState, NextState } from '../util/resolveHookState';
export declare function useToggle(initialState: InitialState<boolean>, ignoreReactEvents: false): [boolean, (nextState?: NextState<boolean>) => void];
export declare function useToggle(initialState?: InitialState<boolean>, ignoreReactEvents?: true): [boolean, (nextState?: NextState<boolean> | BaseSyntheticEvent) => void];
