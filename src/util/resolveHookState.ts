export type IInitialState<S> = S | (() => S);
export type INewState<S> = S | ((prevState: S) => S);

export function resolveHookState<S>(nextState: IInitialState<S>): S;
export function resolveHookState<S>(nextState: INewState<S>, prevState: S): S;
export function resolveHookState<S>(nextState: IInitialState<S> | INewState<S>, prevState?: S): S {
  if (typeof nextState === 'function') return (nextState as CallableFunction)(prevState);

  return nextState;
}
