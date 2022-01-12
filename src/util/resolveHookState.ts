export type IInitialState<State> = State | (() => State);
export type INextState<State, PrevState = State> = State | ((prevState: PrevState) => State);

export function resolveHookState<State>(nextState: IInitialState<State>): State;
export function resolveHookState<State, PrevState = State>(
  nextState: INextState<State, PrevState>,
  prevState: PrevState
): State;
export function resolveHookState<State, PrevState = State>(
  nextState: IInitialState<State> | INextState<State, PrevState>,
  prevState?: PrevState
): State {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  if (typeof nextState === 'function') return (nextState as CallableFunction)(prevState);

  return nextState;
}
