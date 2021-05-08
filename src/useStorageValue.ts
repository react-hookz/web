import { useCallback } from 'react';
import { useSafeState } from './useSafeState';
import { useConditionalEffect } from './useConditionalEffect';
import { INextState, resolveHookState } from './util/resolveHookState';
import { useUpdateEffect } from './useUpdateEffect';
import { useMountEffect } from './useMountEffect';
import { useSyncedRef } from './useSyncedRef';
import { isBrowser } from './util/const';
import { useFirstMountState } from './useFirstMountState';

export type IUseStorageValueAdapter = {
  getItem(key: string): string | null;

  setItem(key: string, value: string): void;

  removeItem(key: string): void;
};

export type IUseStorageValueOptions<
  T,
  Raw extends boolean | undefined = boolean | undefined,
  InitializeWithValue extends boolean | undefined = boolean | undefined
> = {
  /**
   * Whether to store default value to store.
   */
  storeDefaultValue?: boolean;

  /**
   * Serializer to use in non-raw mode.
   *
   * @default JSON.stringify
   */
  serializer?: (value: T) => string;

  /**
   * Deserializer to use in non-raw mode.
   *
   * @default JSON.parse
   */
  deserializer?: (str: string) => T;
} & (Raw extends undefined
  ? {
      /**
       * Whether to use raw, string values.
       *
       * In case raw is set to true, you will be restricted to use string values only.
       *
       * @default false
       */
      raw?: Raw;
    }
  : {
      raw: Raw;
    }) &
  (InitializeWithValue extends undefined
    ? {
        /**
         * Whether to perform value fetch from storage or initialize with `undefined` state.
         *
         * @default true
         */
        initializeWithStorageValue?: InitializeWithValue;
      }
    : {
        initializeWithStorageValue: InitializeWithValue;
      });

// below typings monstrosity required to provide most accurate return type hint

type IReturnState<
  T,
  D,
  O,
  S = O extends { raw: true } ? string : T,
  N = D extends null | undefined ? null | S : S,
  U = O extends { initializeWithStorageValue: false } ? undefined | N : N
> = U;

type INewState<T, D, O, S = O extends { raw: true } ? string : T> = INextState<
  S,
  IReturnState<T, D, O>
>;

type IHookReturn<T, D, O> = [
  IReturnState<T, D, O>,
  (val: INewState<T, D, O>) => void,
  () => void,
  () => void
];

export function useStorageValue<T = unknown>(
  adapter: IUseStorageValueAdapter,
  key: string,
  defaultValue?: null
): IHookReturn<T, typeof defaultValue, IUseStorageValueOptions<T, false, true>>;
export function useStorageValue<T = unknown>(
  adapter: IUseStorageValueAdapter,
  key: string,
  defaultValue: null,
  options: IUseStorageValueOptions<T, false | undefined>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useStorageValue<T = unknown>(
  adapter: IUseStorageValueAdapter,
  key: string,
  defaultValue: null,
  options: IUseStorageValueOptions<T, false | undefined, true | undefined>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useStorageValue<T = unknown>(
  adapter: IUseStorageValueAdapter,
  key: string,
  defaultValue: null,
  options: IUseStorageValueOptions<T, false | undefined, false>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useStorageValue<T = unknown>(
  adapter: IUseStorageValueAdapter,
  key: string,
  defaultValue: null,
  options: IUseStorageValueOptions<T, true>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useStorageValue<T = unknown>(
  adapter: IUseStorageValueAdapter,
  key: string,
  defaultValue: null,
  options: IUseStorageValueOptions<T, true, true | undefined>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useStorageValue<T = unknown>(
  adapter: IUseStorageValueAdapter,
  key: string,
  defaultValue: null,
  options: IUseStorageValueOptions<T, true, false>
): IHookReturn<T, typeof defaultValue, typeof options>;

export function useStorageValue<T>(
  adapter: IUseStorageValueAdapter,
  key: string,
  defaultValue: T
): IHookReturn<T, typeof defaultValue, IUseStorageValueOptions<T, false, true>>;
export function useStorageValue<T>(
  adapter: IUseStorageValueAdapter,
  key: string,
  defaultValue: T,
  options: IUseStorageValueOptions<T, false | undefined>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useStorageValue<T>(
  adapter: IUseStorageValueAdapter,
  key: string,
  defaultValue: T,
  options: IUseStorageValueOptions<T, false | undefined, true | undefined>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useStorageValue<T>(
  adapter: IUseStorageValueAdapter,
  key: string,
  defaultValue: T,
  options: IUseStorageValueOptions<T, false | undefined, false>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useStorageValue<T>(
  adapter: IUseStorageValueAdapter,
  key: string,
  defaultValue: T,
  options: IUseStorageValueOptions<T, true>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useStorageValue<T>(
  adapter: IUseStorageValueAdapter,
  key: string,
  defaultValue: T,
  options: IUseStorageValueOptions<T, true, true | undefined>
): IHookReturn<T, typeof defaultValue, typeof options>;
export function useStorageValue<T>(
  adapter: IUseStorageValueAdapter,
  key: string,
  defaultValue: T,
  options: IUseStorageValueOptions<T, true, false>
): IHookReturn<T, typeof defaultValue, typeof options>;

export function useStorageValue<T>(
  adapter: IUseStorageValueAdapter,
  key: string,
  defaultValue?: T | null,
  options?: IUseStorageValueOptions<T>
): IHookReturn<T, typeof defaultValue, typeof options>;

/**
 * Manages a single storage key.
 *
 * @param adapter storage key to manage
 * @param key storage key to manage
 * @param defaultValue Default value to return in case key not presented in storage
 * @param options
 */
export function useStorageValue<T>(
  adapter: IUseStorageValueAdapter,
  key: string,
  defaultValue: T | null = null,
  options: IUseStorageValueOptions<T> = {}
): IHookReturn<T, typeof defaultValue, typeof options> {
  const {
    deserializer = JSON.parse,
    serializer = JSON.stringify,
    raw,
    initializeWithStorageValue = true,
    storeDefaultValue,
  } = options;

  const methods = useSyncedRef({
    getVal: () => {
      const val = adapter.getItem(key);

      if (val === null) return defaultValue;

      return raw ? val : deserializer(val as string);
    },
    setVal: (val: T | string) => {
      if (raw) {
        if (typeof val !== 'string') {
          throw new TypeError(
            'value has to be a string, define serializer or cast it to string manually'
          );
        }
      } else {
        val = serializer(val as T);
      }

      adapter.setItem(key, val);
    },
    fetchVal: () => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      setState(methods.current.getVal());
    },
    removeVal: () => {
      adapter.removeItem(key);
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      setState(defaultValue);
    },
  });

  const isFirstMount = useFirstMountState();
  const [state, setState] = useSafeState<T | null | string | undefined>(
    initializeWithStorageValue && isBrowser && isFirstMount ? methods.current.getVal() : undefined
  );
  const stateRef = useSyncedRef(state);

  // fetch value on mount for the case `initializeWithStorageValue` is false
  useMountEffect(() => {
    if (!initializeWithStorageValue || !isBrowser) {
      methods.current.fetchVal();
    }
  });

  // store default value if it is not null and options configured to store default value
  useConditionalEffect(() => {
    methods.current.setVal(defaultValue as T);
  }, [state === null && defaultValue !== null && storeDefaultValue]);

  // refetch value when key changed
  useUpdateEffect(() => {
    methods.current.fetchVal();
  }, [key]);

  return [
    state,
    useCallback(
      (newState) => {
        const s = resolveHookState(newState, stateRef.current as T);

        methods.current.setVal(s);
        setState(s);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    ),
    useCallback(() => {
      methods.current.removeVal();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
    useCallback(() => {
      methods.current.fetchVal();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  ];
}
