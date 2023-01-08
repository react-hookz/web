import { MutableRefObject } from 'react';
export type HookableRefHandler<T> = (v: T) => T;
export declare function useHookableRef<T>(initialValue: T, onSet?: HookableRefHandler<T>, onGet?: HookableRefHandler<T>): MutableRefObject<T>;
export declare function useHookableRef<T = undefined>(): MutableRefObject<T | undefined>;
